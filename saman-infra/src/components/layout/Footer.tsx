import Container from '@/components/ui/Container';
import type { CompanyInfo, ContactInfo, ReferenceDocument } from '@/types/content';

interface FooterProps {
  company: CompanyInfo;
  contact: ContactInfo;
  referenceDocuments?: ReferenceDocument[];
}

/**
 * Footer — secondary contact repeat (intentional redundancy, not
 * decoration — reduces friction, so it survives the Negative Design
 * boundary) plus optional Type C reference document downloads.
 */
export default function Footer({ company, contact, referenceDocuments = [] }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-secondary">
      <Container className="grid grid-cols-1 gap-l py-xl md:grid-cols-3">
        <div>
          <p className="heading-card mb-xs">{company.name}</p>
          {company.category.value ? <p className="body-text">{company.category.value}</p> : null}
        </div>

        <div>
          <p className="eyebrow mb-s">Contact</p>
          {contact.phone.value ? <p className="body-text">{contact.phone.value}</p> : null}
          {contact.email.value ? <p className="body-text">{contact.email.value}</p> : null}
          {contact.address.value ? <p className="body-text">{contact.address.value}</p> : null}
        </div>

        {referenceDocuments.length > 0 ? (
          <div>
            <p className="eyebrow mb-s">Resources</p>
            {referenceDocuments.map((doc) => (
              <a key={doc.fileUrl} href={doc.fileUrl} className="body-text block !text-text-primary hover:text-accent">
                {doc.label}
              </a>
            ))}
          </div>
        ) : null}
      </Container>

      <Container className="border-t border-border py-s">
        <p className="body-text !text-xs">
          © {year} {company.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
