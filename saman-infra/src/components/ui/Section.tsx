import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  label: string;
  surface?: 'primary' | 'secondary';
  className?: string;
}

/**
 * Section — primitive. Owns vertical rhythm (token spacing) and
 * background surface alternation. Renders as a semantic <section>
 * with a required accessible label for screen-reader landmark
 * navigation — `label` is required, not optional, on purpose.
 */
export default function Section({
  children,
  id,
  label,
  surface = 'primary',
  className = '',
}: SectionProps) {
  const surfaceClass = surface === 'secondary' ? 'bg-surface-secondary' : 'bg-surface-primary';

  return (
    <section id={id} aria-label={label} className={`py-xl md:py-2xl ${surfaceClass} ${className}`}>
      {children}
    </section>
  );
}
