import { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { resolveImage } from '@/assets/registry';
import type { ImageId } from '@/types/content';

interface NavbarProps {
  companyName: string;
  logoId?: ImageId;
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Why Us', href: '#evidence' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Navbar — sticky header. Mobile: collapses into a drawer per
 * Responsive Rules. CTA remains visible at all breakpoints — "reachable
 * within one click from anywhere" is a hard requirement.
 */
export default function Navbar({ companyName, logoId }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const logo = resolveImage(logoId);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-primary/95 backdrop-blur">
      <Container className="flex items-center justify-between py-s">
        <a href="#top" className="flex items-center gap-s no-underline">
          {logo ? (
            <img src={logo} alt={companyName} className="h-10 w-auto" />
          ) : (
            <span className="heading-card !text-m">{companyName}</span>
          )}
        </a>

        <nav className="hidden md:flex md:items-center md:gap-l" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="body-text !text-text-primary hover:text-accent">
              {link.label}
            </a>
          ))}
          <Button as="a" href="#contact" variant="primary">
            Get in Touch
          </Button>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </Container>

      {open ? (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border bg-surface-primary md:hidden">
          <Container className="flex flex-col gap-m py-m">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="body-text !text-text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button as="a" href="#contact" variant="primary" onClick={() => setOpen(false)}>
              Get in Touch
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
