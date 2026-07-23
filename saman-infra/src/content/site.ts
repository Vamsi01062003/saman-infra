import { confirmedFact, pendingFact } from '@/types/content';
import type {
  CompanyInfo,
  HeroContent,
  Service,
  Project,
  EvidenceItem,
  ContactInfo,
  ReferenceDocument,
} from '@/types/content';

/**
 * SITE CONTENT — single source of truth for all business data.
 *
 * Every `Fact<T>` field starts as `pendingFact()`. Replace with
 * `confirmedFact(realValue)` only once the asset/content audit
 * verifies it against real client material. Components branch on
 * `.status` and render an honest empty state for anything pending —
 * never a placeholder value.
 *
 * First real content pass — sourced from 9 client-supplied poster
 * screenshots (asset audit run [date of this pass]). See PR/commit
 * notes for per-field source citations. Two things intentionally
 * left pending rather than guessed:
 *  - contact.whatsapp: posters show a phone number but never
 *    confirm it's also the WhatsApp Business number — don't assume.
 *  - contact.mapsUrl: posters show a QR code, but it wasn't
 *    decodable from the supplied screenshots (tried, failed —
 *    resolution too low). Ask the client for the plain Maps link.
 */

export const company: CompanyInfo = {
  name: 'SAMAN INFRA & CORPORATE SOLUTIONS',
  // Directly from the company's own name/branding — not synthesized.
  category: confirmedFact('Infra & Corporate Solutions'),
  // NOT set to confirmed: this would be Claude-drafted marketing
  // copy, not a client-supplied fact, even if built from verified
  // service data. A candidate is drafted below for approval — see
  // comment. Only mark confirmed once the client actually approves
  // specific wording.
  //
  // Draft candidate (from verified services list, needs approval):
  // "SAMAN Infra & Corporate Solutions provides building
  // construction, interior design, real estate, land development,
  // and documentation services in Sindhanur, Karnataka."
  positioningStatement: pendingFact(),
  yearsInBusiness: pendingFact(),
  projectsCompleted: pendingFact(),
  regionsServed: pendingFact(),
  logoId: confirmedFact('logo-lockup'),
};

export const hero: HeroContent = {
  // Candidates exist (the two land photos are genuine photography)
  // but choosing THE hero image is a design decision, not a fact
  // extraction — left pending for an explicit choice rather than
  // picked unilaterally.
  heroImageId: pendingFact(),
  primaryCta: { label: 'Contact Us', target: '#contact' },
  // Two real taglines found on different posters — Image 9's
  // matches the client's own handoff text, so used as the
  // secondary CTA candidate. Image 5's "Building Trust. Delivering
  // Excellence." is a real variant too — flagged for the client to
  // confirm which is canonical, not resolved here.
  secondaryCta: confirmedFact({ label: 'Our Services', target: '#services' }),
};

/**
 * Extracted from 9 poster images. Grouped into 4 categories at the
 * presentation layer (see Services.tsx notes) rather than cut down
 * to fit an earlier "3-6 items" scannability guideline — all are
 * real, verified offerings; none invented.
 *
 * Deliberately excluded: the specific land/site/flat LISTINGS shown
 * on the posters (8-acre land parcel, 6-guntas site, 2BHK/3BHK flats
 * at a named project). Those are individual property inventory, not
 * general services — including them here would quietly reintroduce
 * the "property marketplace" pattern the original project brief
 * explicitly excluded. Flagged separately, not silently included.
 */
export const services: Service[] = [
  {
    id: 'building-construction',
    name: 'Building Construction',
    description: 'Quality construction built on trust.',
    imageId: '', // no authentic project photography confirmed yet — see asset audit
    ctaHref: '#contact',
  },
  {
    id: 'interior-design',
    name: 'Interior Design',
    description: 'Designing spaces that inspire — interior fit-outs for home and office.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Developers',
    description: 'Reliable real estate solutions for residential and commercial needs.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'land-development',
    name: 'Land Development',
    description: 'Expertise in transforming land into valuable opportunities.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'site-planning',
    name: 'Site Planning',
    description: 'Well-planned layouts for smart and sustainable growth.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'documentation',
    name: 'Documentation Services',
    description: 'End-to-end legal support and hassle-free documentation.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'accounting',
    name: 'Accounting Services',
    description: 'Accurate, reliable accounting support.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'aadhaar-services',
    name: 'Aadhaar Card Services',
    description: 'Quick, secure, and hassle-free Aadhaar card processing.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'pan-card-services',
    name: 'PAN Card Services',
    description: 'Trusted and reliable PAN card processing.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'metal-cupboards',
    name: 'Premium Metal Cupboards',
    description: 'Smart, secure, and sophisticated storage — biometric access, integrated technology.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'modular-kitchen',
    name: 'Modular Kitchen Solutions',
    description: 'Hygienic, rust-proof, and customizable stainless-steel kitchen solutions.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'custom-sofas',
    name: 'Custom Sofas & Interiors',
    description: 'Bespoke sofa designs and fabric selection.',
    imageId: '',
    ctaHref: '#contact',
  },
  {
    id: 'custom-blinds',
    name: 'Custom Window Blinds',
    description: 'Bespoke window blind solutions for home and office.',
    imageId: '',
    ctaHref: '#contact',
  },
];

/**
 * Held at zero deliberately. The land-plot photos (2 images) are
 * genuine, usable photography, but presenting them as "Projects/
 * Case Studies" would need real project facts (problem/solution/
 * evidence per Content Model Question 3) that weren't in the
 * supplied posters — a poster saying "8 Acres for Sale" is a
 * listing, not a case study. Needs client input before populating.
 */
export const projects: Project[] = [];

/**
 * Held at zero. Nothing in the supplied posters constitutes
 * client-attributable "evidence" per our Evidence Classification
 * (certifications, registration, verified project count, etc.) —
 * posters contain marketing claims ("Trusted & Reliable", "100%
 * Secure") which are exactly the kind of unverifiable claim this
 * field is designed to exclude.
 */
export const evidence: EvidenceItem[] = [];

export const contact: ContactInfo = {
  phone: confirmedFact('9620261097'),
  // Not assumed to equal the phone number — see file header note.
  whatsapp: pendingFact(),
  email: confirmedFact('samaninfra01@gmail.com'),
  address: confirmedFact('Venkateshwara Nagar, Sindhanur - 584128'),
  // QR code present on posters but not decodable from the supplied
  // screenshots (attempted, failed — resolution too low). Ask for
  // the plain Google Maps link directly.
  mapsUrl: pendingFact(),
  businessHours: pendingFact(),
};

/** Type C assets — original posters/brochures, downloads only. */
export const referenceDocuments: ReferenceDocument[] = [];
