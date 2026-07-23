/**
 * FIRESTORE CONTENT TYPES — for content managed through the future
 * admin panel, stored in Firestore.
 *
 * Deliberately NOT using Fact<T> here (contrast with types/content.ts).
 * Fact<T> exists to prevent an AI/developer from silently inventing
 * business facts in a static source file. Once a human is entering
 * this data directly through an authenticated admin UI and saving it
 * to a database, that problem doesn't apply — the human's deliberate
 * save action is the verification step. Every field below is either
 * genuinely optional (the admin hasn't filled it in yet) or required
 * (the form validates it before save) — plain TypeScript optionality
 * is the right tool here, not the heavier Fact<T> ceremony.
 *
 * All documents share `createdAt`/`updatedAt` (Firestore Timestamps)
 * and `published` (draft vs. live) — standard CMS concerns that
 * don't exist in the static content model.
 */
import type { Timestamp } from 'firebase/firestore';

interface FirestoreDoc {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  /** Draft documents are visible in the admin panel only. */
  published: boolean;
}

export type PropertyType = 'apartment' | 'land' | 'site' | 'commercial' | 'villa';
export type PropertyStatus = 'available' | 'sold' | 'booked';

export interface Property extends FirestoreDoc {
  name: string;
  type: PropertyType;
  /** Stored in the smallest real currency unit (paise) to avoid
   * floating-point rounding issues; format for display at the UI layer. */
  priceInPaise: number | null; // null = "Contact for price"
  areaSqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  location: string;
  description: string;
  /** Storage paths, not raw URLs — resolved to download URLs at read time. */
  imagePaths: string[];
  status: PropertyStatus;
  featured: boolean;
  googleMapsUrl: string | null;
  /** Display order within its status/type group; admin-controlled. */
  order: number;
}

export interface CmsProject extends FirestoreDoc {
  name: string;
  description: string;
  imagePaths: string[];
  completionStatus: 'completed' | 'ongoing' | 'upcoming';
  order: number;
}

export interface Testimonial extends FirestoreDoc {
  authorName: string;
  authorRole: string | null;
  quote: string;
  /** Testimonials are evidence — same governance concern as the
   * static Evidence Classification: only ever populated from a real,
   * attributable source. The admin form should require this. */
  attributionConfirmed: boolean;
  order: number;
}

export interface GalleryImage extends FirestoreDoc {
  imagePath: string;
  caption: string | null;
  category: 'project' | 'office' | 'team' | 'other';
  order: number;
}

/**
 * Singleton document (single doc in a `companyProfile` collection,
 * fixed id 'main') — the Firestore-backed evolution of the static
 * `company`/`contact` objects in content/site.ts. Once this is wired
 * up (Phase 5), it REPLACES those static reads; it doesn't duplicate
 * them.
 */
export interface CompanyProfileDoc {
  name: string;
  category: string;
  positioningStatement: string;
  logoPath: string | null;
  heroImagePath: string | null;
  phone: string;
  whatsapp: string | null;
  email: string;
  address: string;
  mapsUrl: string | null;
  businessHours: string | null;
  updatedAt: Timestamp;
}
