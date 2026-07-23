/**
 * CONTENT TYPES — shared shapes for all business data.
 *
 * `Fact<T>` is the enforcement mechanism for "no fabricated business
 * information": any field that represents a factual claim about the
 * business must be wrapped in it. A component can check `.status`
 * and render an honest pending state instead of a guessed value —
 * and because this is a type, forgetting to handle the pending case
 * is a compile error, not a runtime surprise.
 */
export interface Fact<T> {
  value: T | null;
  status: 'confirmed' | 'pending';
  source: 'client' | null;
}

export function confirmedFact<T>(value: T): Fact<T> {
  return { value, status: 'confirmed', source: 'client' };
}

export function pendingFact<T>(): Fact<T> {
  return { value: null, status: 'pending', source: null };
}

/** Reference into the image asset registry (see src/assets/registry.ts). */
export type ImageId = string;

export interface CompanyInfo {
  name: string;
  category: Fact<string>; // e.g. "Property & Infrastructure Solutions"
  positioningStatement: Fact<string>; // one factual sentence, no adjectives
  yearsInBusiness: Fact<number>;
  projectsCompleted: Fact<number>;
  regionsServed: Fact<string>;
  logoId: Fact<ImageId>;
}

export interface HeroContent {
  heroImageId: Fact<ImageId>;
  primaryCta: { label: string; target: string };
  secondaryCta: Fact<{ label: string; target: string }>;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageId: ImageId;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface Project {
  id: string;
  title: string;
  location?: string;
  problem: string;
  solution: string;
  evidence: string;
  imageIds: ImageId[];
  relatedServiceIds?: string[];
  contactCtaLabel?: string;
}

export type EvidenceType =
  | 'certification'
  | 'registration'
  | 'officePhoto'
  | 'completedProjects'
  | 'serviceCoverage'
  | 'teamPhoto'
  | 'contactDetails';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  title: string;
  description?: string;
  imageId?: ImageId;
}

export interface ContactInfo {
  phone: Fact<string>;
  whatsapp: Fact<string>;
  email: Fact<string>;
  address: Fact<string>;
  mapsUrl: Fact<string>;
  businessHours: Fact<string>;
}

/** Shape of a contact form submission. Backend wiring is deferred
 * (see README "Open Decisions") — this interface lets the UI and the
 * eventual backend integration be built independently. */
export interface ContactSubmission {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}

export interface ReferenceDocument {
  label: string;
  fileUrl: string;
}
