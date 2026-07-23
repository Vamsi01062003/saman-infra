import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import type { EvidenceItem } from '@/types/content';

interface EvidenceProps {
  evidence: EvidenceItem[];
}

/**
 * Evidence — answers Content Model Question 4: "Why should I trust
 * you?" 2-column compact grid per Layout Contract. Only client-
 * supplied, attributable evidence is ever rendered here.
 */
export default function Evidence({ evidence }: EvidenceProps) {
  return (
    <Section id="evidence" label="Why Trust Us" surface="secondary">
      <Container>
        <h2 className="heading-section mb-l">Why Trust Us</h2>

        {evidence.length === 0 ? (
          <p className="body-text italic text-text-secondary/60">
            Trust evidence pending — awaiting certifications, registration details, or
            verifiable facts from the client.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-m sm:grid-cols-2">
            {evidence.map((item) => (
              <Card
                key={item.id}
                imageId={item.imageId}
                imageAlt={item.title}
                title={item.title}
                description={item.description}
                density="compact"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
