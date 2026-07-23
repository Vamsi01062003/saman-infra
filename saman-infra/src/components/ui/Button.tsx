import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  href?: never;
}

interface ButtonAsAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a';
  href: string;
}

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-surface-primary hover:bg-accent-hover',
  ghost: 'bg-transparent text-text-primary border border-border hover:border-accent',
};

/**
 * Button — primitive. Two variants only. No component-local colors,
 * spacing, or typography: everything resolves to tokens.css via the
 * Tailwind config.
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-s px-m py-s text-s font-body transition duration-DEFAULT ease-DEFAULT';
  const classes = `${base} ${VARIANT_CLASSES[variant]} ${className}`;

  if (rest.as === 'a') {
    const { as: _as, ...anchorProps } = rest;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
