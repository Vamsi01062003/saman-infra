import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container — primitive. Constrains content to the token-defined
 * max width and applies consistent horizontal padding.
 */
export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto max-w-content px-s md:px-l ${className}`}>{children}</div>;
}
