-- Aplicar no projeto remoto: Supabase Dashboard → SQL Editor → New query → colar → Run
-- Objetivo: permitir upload de PDFs de especificações no bucket cms-images (painel de equipamentos).

-- Atualiza tipos MIME permitidos (mantém imagens + PDF).
update storage.buckets
set
  allowed_mime_types = array[
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
    'application/pdf'
  ],
  public = true
where id = 'cms-images';

-- Se o bucket ainda não existir, cria com as mesmas regras do supabase-schema.sql principal.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-images',
  'cms-images',
  true,
  10485760,
  array[
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
    'application/pdf'
  ]
)
on conflict (id) do update set
  public = true,
  allowed_mime_types = excluded.allowed_mime_types,
  file_size_limit = excluded.file_size_limit;
