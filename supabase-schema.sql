-- ============================================================================
-- SCHEMA COMPLETO DO CMS — Lógica Automação Comercial
-- v2.0 — Autenticação admin segura + portal + conteúdo + configurações
--
-- Execute no SQL Editor do Supabase (em ordem, do início ao fim):
--   https://supabase.com → seu projeto → SQL Editor → New query → Cole e rode
-- ============================================================================


-- ─── 1. ENUM: tipos de campo de conteúdo ─────────────────────────────────────
-- Espelha o enum ContentType do Prisma (prisma/schema.prisma)

do $$ begin
  create type public.content_type as enum (
    'text',
    'image_url',
    'color',
    'link',
    'boolean'
  );
exception when duplicate_object then null; end $$;


-- ─── 2. TABELA: perfis de administradores ────────────────────────────────────
-- Vinculada ao Supabase Auth (auth.users) para login seguro no painel admin.
--
-- SETUP OBRIGATÓRIO (uma vez):
--   Supabase Dashboard → Authentication → Users → "Add user" →
--   Informe o e-mail e senha do admin. Depois copie o UUID gerado e rode:
--     INSERT INTO public.admin_profiles (id, name) VALUES ('<uuid>', 'Admin');
--
-- MIGRAÇÃO DO CÓDIGO:
--   AdminAuthContext.tsx precisa trocar a verificação por env var por:
--     supabase.auth.signInWithPassword({ email, password })
--   Isso elimina a senha exposta no bundle JavaScript (VITE_ADMIN_PASSWORD).

create table if not exists public.admin_profiles (
  id         uuid         primary key references auth.users (id) on delete cascade,
  name       text         not null default 'Administrador',
  created_at timestamptz  not null default now()
);

comment on table public.admin_profiles is
  'Perfis dos administradores do painel. Vinculado ao Supabase Auth.';


-- ─── 3. TABELA: usuários do portal de clientes ───────────────────────────────
-- Usada por api/auth/login.ts (autenticação JWT do portal).
-- Espelha o model User do Prisma + campos extras que AuthContext.tsx usa.
--
-- NOTA: esta tabela só deve ser acessada via service_role (API server-side).
-- O RLS bloqueia todo acesso pela anon key — acesso direto pelo cliente
-- seria uma falha de segurança (exporia hashes de senha).

create table if not exists public.users (
  id            serial       primary key,
  email         text         not null unique,
  password_hash text         not null,
  name          text         not null default '',
  cnpj          text,
  company       text,
  user_type     text         not null default 'standard'
                             check (user_type in ('standard', 'premium')),
  created_at    timestamptz  not null default now()
);

comment on table public.users is
  'Usuários do portal de clientes. Autenticação por email/senha via API JWT (Vercel).';
comment on column public.users.password_hash is
  'Hash bcrypt ou SHA-256 da senha. Nunca armazene senhas em texto puro.';
comment on column public.users.user_type is
  'Nível de acesso: standard (básico) ou premium (acesso completo).';


-- ─── 4. TABELA: conteúdo do site ─────────────────────────────────────────────
-- CORREÇÕES em relação à v1:
--   • Coluna renomeada: field_key → key  (alinha com prisma/schema.prisma)
--   • Coluna adicionada: label           (rótulo legível no painel)
--   • Coluna adicionada: type            (enum content_type)
--   • id: bigserial → serial             (alinha com Int do Prisma)
--
-- ATENÇÃO: se você já rodou a v1 no banco, execute antes:
--   ALTER TABLE public.site_content
--     RENAME COLUMN field_key TO key;
--   ALTER TABLE public.site_content
--     ADD COLUMN IF NOT EXISTS label text not null default '';
--   ALTER TABLE public.site_content
--     ADD COLUMN IF NOT EXISTS type public.content_type not null default 'text';
--   ALTER INDEX uq_site_content_section_field
--     RENAME TO uq_site_content_section_key;

create table if not exists public.site_content (
  id         serial              primary key,
  section    text                not null,
  key        text                not null,
  label      text                not null default '',
  value      text                not null default '',
  type       public.content_type not null default 'text',
  updated_at timestamptz         not null default now(),

  constraint uq_site_content_section_key unique (section, key)
);

comment on table  public.site_content            is 'Conteúdo editável do site (textos, imagens, cores)';
comment on column public.site_content.section    is 'Seção do site (hero, sobre, contato, etc.)';
comment on column public.site_content.key        is 'Chave do campo dentro da seção';
comment on column public.site_content.label      is 'Rótulo legível exibido no painel admin';
comment on column public.site_content.value      is 'Valor do campo (texto, URL ou cor hex)';
comment on column public.site_content.type       is 'Tipo: text | image_url | color | link | boolean';
comment on column public.site_content.updated_at is 'Última atualização';

create index if not exists idx_site_content_section
  on public.site_content (section);


-- ─── 5. TABELA: configurações globais ────────────────────────────────────────
-- Espelha o model SiteSettings do Prisma.
-- Usada por /api/settings/ e por AdminSettings.tsx.
-- Exemplos de keys: "company_name", "logo_url", "primary_color".

create table if not exists public.site_settings (
  id         serial       primary key,
  key        text         not null unique,
  label      text         not null default '',
  value      text         not null default '',
  updated_at timestamptz  not null default now()
);

comment on table public.site_settings is
  'Configurações globais do site (nome da empresa, logo, cores principais)';
comment on column public.site_settings.key   is 'Identificador único da configuração';
comment on column public.site_settings.label is 'Rótulo legível exibido no painel admin';
comment on column public.site_settings.value is 'Valor da configuração';


-- ─── 6. TRIGGER: auto-atualização de updated_at ──────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- site_content
drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- site_settings
drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();


-- ─── 7. ROW LEVEL SECURITY ───────────────────────────────────────────────────

-- ── admin_profiles ──
alter table public.admin_profiles enable row level security;

drop policy if exists "Admin vê o próprio perfil" on public.admin_profiles;
create policy "Admin vê o próprio perfil"
  on public.admin_profiles for select
  using (auth.uid() = id);

drop policy if exists "Admin atualiza o próprio perfil" on public.admin_profiles;
create policy "Admin atualiza o próprio perfil"
  on public.admin_profiles for update
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- ── users (portal) ──
-- Bloqueio total via anon key: acesso somente via service_role no backend.
alter table public.users enable row level security;
-- Sem políticas públicas intencionalmente.
-- A API Vercel usa a service_role key para ler/escrever esta tabela.

-- ── site_content ──
alter table public.site_content enable row level security;

-- Qualquer visitante pode LER (necessário para o site funcionar)
drop policy if exists "Leitura pública do conteúdo" on public.site_content;
create policy "Leitura pública do conteúdo"
  on public.site_content for select
  using (true);

-- Somente admins autenticados via Supabase Auth podem ESCREVER
drop policy if exists "Admin insere conteúdo" on public.site_content;
create policy "Admin insere conteúdo"
  on public.site_content for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin atualiza conteúdo" on public.site_content;
create policy "Admin atualiza conteúdo"
  on public.site_content for update
  using  (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin deleta conteúdo" on public.site_content;
create policy "Admin deleta conteúdo"
  on public.site_content for delete
  using (auth.role() = 'authenticated');

-- ── site_settings ──
alter table public.site_settings enable row level security;

drop policy if exists "Leitura pública das configurações" on public.site_settings;
create policy "Leitura pública das configurações"
  on public.site_settings for select
  using (true);

drop policy if exists "Admin gerencia configurações" on public.site_settings;
create policy "Admin gerencia configurações"
  on public.site_settings for all
  using  (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ─── 8. MIGRAÇÃO: renomear field_key → key (apenas se já existir a v1) ───────
-- Se a tabela já foi criada com a v1 do schema (coluna field_key), execute
-- este bloco separadamente para migrar sem perder dados:
--
-- DO $$
-- BEGIN
--   IF EXISTS (
--     SELECT 1 FROM information_schema.columns
--     WHERE table_schema = 'public'
--       AND table_name   = 'site_content'
--       AND column_name  = 'field_key'
--   ) THEN
--     ALTER TABLE public.site_content RENAME COLUMN field_key TO key;
--     ALTER TABLE public.site_content
--       ADD COLUMN IF NOT EXISTS label text not null default '';
--     ALTER TABLE public.site_content
--       ADD COLUMN IF NOT EXISTS type public.content_type not null default 'text';
--   END IF;
-- END $$;


-- ─── 9. PERFIL DO ADMINISTRADOR ──────────────────────────────────────────────
-- Vincula o usuário criado no Supabase Auth ao perfil de admin.
-- Este INSERT já usa o UUID real do usuário venda02@logica.inf.br.
-- Execute uma única vez após criar o usuário no Auth.

insert into public.admin_profiles (id, name)
values ('9cde18c3-8eff-4fe9-b36f-e01bc5fd0df0', 'Admin Lógica')
on conflict (id) do nothing;


-- ─── 10. STORAGE: bucket de imagens do CMS ───────────────────────────────────
-- Cria (ou ignora se já existir) o bucket público "cms-images".
-- IMPORTANTE: execute este bloco no SQL Editor do Supabase se o bucket ainda
-- não aparecer em Storage → Buckets no dashboard.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-images',
  'cms-images',
  true,
  10485760,   -- 10 MB por arquivo
  array['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do update set public = true;

-- Leitura pública (qualquer visitante pode ver as imagens)
drop policy if exists "Public read cms-images" on storage.objects;
create policy "Public read cms-images"
  on storage.objects for select
  using (bucket_id = 'cms-images');

-- Upload somente por admin autenticado via Supabase Auth
drop policy if exists "Auth upload cms-images" on storage.objects;
create policy "Auth upload cms-images"
  on storage.objects for insert
  with check (bucket_id = 'cms-images' and auth.role() = 'authenticated');

-- Substituição de arquivo (upsert)
drop policy if exists "Auth update cms-images" on storage.objects;
create policy "Auth update cms-images"
  on storage.objects for update
  using  (bucket_id = 'cms-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'cms-images' and auth.role() = 'authenticated');

-- Exclusão de arquivo
drop policy if exists "Auth delete cms-images" on storage.objects;
create policy "Auth delete cms-images"
  on storage.objects for delete
  using (bucket_id = 'cms-images' and auth.role() = 'authenticated');


-- ─── 11. VERIFICAÇÃO FINAL ────────────────────────────────────────────────────
-- Confirme que todas as tabelas foram criadas:

select
  t.table_name,
  (
    select count(*)
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name   = t.table_name
  ) as total_colunas
from information_schema.tables t
where t.table_schema = 'public'
  and t.table_name in (
    'admin_profiles',
    'users',
    'site_content',
    'site_settings'
  )
order by t.table_name;
