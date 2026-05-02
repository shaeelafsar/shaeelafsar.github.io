import type { Metadata } from "next";
import { FadeIn } from "@/components/animation";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialLinks } from "@/components/contact/social-links";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Contact",
    description: "Get in touch with Shaeel Afsar for freelance, product, and frontend collaboration.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 md:pt-20 lg:pt-24">
        <Container>
          <FadeIn>
            <div className="max-w-3xl space-y-5" data-testid="contact-hero">
              <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.2em] text-muted-foreground">
                Contact
              </p>
              <Heading as="h1" size="h1">
                Get in Touch
              </Heading>
              <p className="text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
                Whether you need a polished frontend, a thoughtful portfolio refresh, or a partner to turn rough ideas into a clear product plan, I’d love to hear what you’re building.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.85fr)] xl:gap-10">
            <FadeIn className="order-1 lg:order-2">
              <SocialLinks />
            </FadeIn>
            <FadeIn delay={0.15} className="order-2 lg:order-1">
              <ContactForm />
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  );
}
