import { resolveImage } from '@/assets/registry';
import type { ImageId } from '@/types/content';

interface CardBaseProps {
  imageId?: ImageId;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  density?: 'compact' | 'feature';
  className?: string;
}

/** Content image: alt text is required, no silent empty-string default. */
type CardContentImage = CardBaseProps & {
  decorative?: false;
  imageAlt: string;
};

/** Decorative image: alt is intentionally suppressed, and the prop
 * name makes that an explicit choice rather than an accidental omission. */
type CardDecorativeImage = CardBaseProps & {
  decorative: true;
  imageAlt?: never;
};

type CardProps = CardContentImage | CardDecorativeImage;

/**
 * Card — generic primitive: image (or empty-state box) + heading +
 * short text + optional CTA, stacked. Used by Services and Evidence.
 *
 * Alt text handling is deliberately strict: for any image that
 * conveys information (the default case), `imageAlt` is required by
 * the type system — there is no silent `''` fallback a caller could
 * forget to override. An image can only skip alt text by explicitly
 * passing `decorative`, which is a conscious choice, not a default.
 *
 * NOTE: this intentionally does NOT try to also cover the project
 * case-study layout (side-by-side, alternating, problem/solution/
 * evidence fields) — that's a structurally different, more complex
 * shape and lives as a local component inside blocks/Projects.tsx
 * instead of being forced through this primitive. See Component
 * Contract discussion.
 */
export default function Card(props: CardProps) {
  const { imageId, title, description, ctaLabel, ctaHref, density = 'compact', className = '' } = props;
  const alt = props.decorative ? '' : props.imageAlt;

  const padding = density === 'feature' ? 'p-l' : 'p-m';
  const image = resolveImage(imageId);

  return (
    <div className={`rounded-s border border-border bg-surface-primary shadow-card ${padding} ${className}`}>
      {image ? (
        <img
          src={image}
          alt={alt}
          className="mb-s aspect-[4/3] w-full rounded-s object-cover"
          loading="lazy"
        />
      ) : props.decorative ? (
        <div
          className="mb-s aspect-[4/3] w-full rounded-s border border-dashed border-border"
          aria-hidden="true"
        />
      ) : (
        <div
          className="mb-s flex aspect-[4/3] w-full items-center justify-center rounded-s border border-dashed border-border text-xs text-text-secondary"
          role="img"
          aria-label={`Image pending for ${title}`}
        >
          Image pending
        </div>
      )}
      <h3 className="heading-card mb-xs">{title}</h3>
      {description ? <p className="body-text">{description}</p> : null}
      {ctaLabel && ctaHref ? (
        <a href={ctaHref} className="mt-s inline-block text-s text-accent underline-offset-4 hover:underline">
          {ctaLabel}
        </a>
      ) : null}
    </div>
  );
}
