import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import type { Service } from '@/types/content';

interface ServicesProps {
  services: Service[];
}

/**
 * Services — answers Content Model Question 2: "What do you actually
 * do?" 3-column responsive grid per Layout Contract.
 */
export default function Services({ services }: ServicesProps) {
  return (
    <Section id="services" label="Services" surface="secondary">
      <Container>
        <h2 className="heading-section mb-l">What We Do</h2>

        {services.length === 0 ? (
          <p className="body-text italic text-text-secondary/60">
            Service list pending — awaiting client input.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-m sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                imageId={service.imageId}
                imageAlt={service.name}
                title={service.name}
                description={service.description}
                ctaLabel={service.ctaLabel}
                ctaHref={service.ctaHref}
                density="compact"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
