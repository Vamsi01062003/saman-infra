import type { ImageId } from '@/types/content';
import logoLockup from './logos/logo-lockup-draft.png';

/**
 * IMAGE REGISTRY — single place that maps a content-facing ImageId to
 * an actual imported asset. Content config (site.ts) references images
 * by ID only, never by raw path — so content can be written before
 * files exist, and swapping a file later never touches component code.
 *
 * 'logo-lockup': extracted from a client-supplied WhatsApp screenshot
 * (asset audit) — readable but capped at screenshot resolution (~706px
 * wide source). Fine for header/favicon use; replace with a
 * vector/high-res source file before using it anywhere larger.
 *
 * Service images are intentionally NOT populated yet — the poster
 * imagery for services (kitchen renders, cupboard renders, sofa
 * scenes) appears to be stock/AI-generated marketing art rather than
 * authentic photography of the business's own work. See asset audit
 * notes. Do not add these without confirming they're genuinely
 * Saman's own commissioned photography, not template stock art.
 */
export const images: Record<ImageId, string> = {
  'logo-lockup': logoLockup,
};

export function resolveImage(id: ImageId | undefined): string | undefined {
  if (!id) return undefined;
  return images[id];
}
