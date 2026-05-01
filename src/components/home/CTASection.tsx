import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function CTASection() {
  const whatsappUrl = `https://wa.me/5547984218275?text=${encodeURIComponent("Olá! Vim através do site e gostaria de informações.")}`;

  return (
    <section className="gradient-primary section-padding">
      <div className="container-narrow mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Fale com nossos especialistas e descubra a solução ideal para a sua empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="xl">
                <MessageCircle className="w-5 h-5" />
                Fale no WhatsApp
              </Button>
            </a>
            <Link to="/contato">
              <Button variant="cta" size="xl">
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
