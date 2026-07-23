import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { resolveImage } from '@/assets/registry';
import type { CompanyInfo, HeroContent } from '@/types/content';

interface HeroProps {
  company: CompanyInfo;
  hero: HeroContent;
}

/**
 * Hero — answers Content Model Question 1: "Who are you?" Split
 * layout on desktop, stacks on mobile. Renders an honest pending
 * state when positioning copy or hero image aren't supplied yet —
 * never fills the gap with placeholder marketing copy.
 *
 * Owns its own Section/landmark rather than relying on the caller
 * (App.tsx) to wrap it — every block is self-contained, so composing
 * them is just listing them, and accessible landmark semantics live
 * inside the component that owns the content, not the assembly layer.
 */
export default function Hero({ company, hero: heroContent }: HeroProps) {
  const heroImage = resolveImage(heroContent.heroImageId.value ?? undefined);

  return (
    <Section id="top" label="Introduction">
      <Container>
        <div className="grid grid-cols-1 items-center gap-l md:grid-cols-2">
        <div>
          <h1 className="heading-display mb-s">{company.name}</h1>

          {company.category.value ? (
            <p className="eyebrow mb-m">{company.category.value}</p>
          ) : (
            <p className="eyebrow mb-m text-text-secondary/60">
              Business category — pending client input
            </p>
          )}

          {company.positioningStatement.value ? (
            <p className="body-text !text-m mb-l">{company.positioningStatement.value}</p>
          ) : (
            <p className="body-text mb-l italic text-text-secondary/60">
              Positioning statement pending — awaiting one factual sentence from the client
              describing what the company does.
            </p>
          )}

          <div className="flex flex-wrap gap-s">
            <Button as="a" href={heroContent.primaryCta.target} variant="primary">
              {heroContent.primaryCta.label}
            </Button>
            {heroContent.secondaryCta.value ? (
              <Button as="a" href="#projects" variant="ghost">
                {heroContent.secondaryCta.value.label}
              </Button>
            ) : null}
          </div>
        </div>

        <div>
          {heroImage ? (
            <img
              src={heroImage}
              alt={`${company.name} — company overview`}
              className="aspect-[4/3] w-full rounded-s object-cover shadow-card"
            />
          ) : (
            <div
              className="flex aspect-[4/3] w-full items-center justify-center rounded-s border border-dashed border-border text-s text-text-secondary"
              role="img"
              aria-label="Hero photograph pending"
            >
              Hero photograph pending client asset audit
            </div>
          )}
        </div>
      </div>
      </Container>
    </Section>
  );
}
