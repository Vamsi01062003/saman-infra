/**
 * validate-site.ts — runs before `dev` and `build` (see package.json
 * "predev"/"prebuild"). Deliberately lives OUTSIDE src/ and is only
 * ever invoked via `tsx`, never imported by application code — so
 * zod and this validation logic can never end up in the production
 * bundle, regardless of build config or accidental imports.
 *
 * This complements Fact<T>, it doesn't replace it: Fact<T> gives
 * compile-time shape guarantees; this catches the things TypeScript
 * can't — internal inconsistency (status says confirmed but value is
 * null), duplicate IDs, malformed URLs, and image references that
 * point at nothing in the registry.
 */
import { z } from 'zod';
import {
  company,
  hero,
  services,
  projects,
  evidence,
  contact,
  referenceDocuments,
} from '../src/content/site';
import { images } from '../src/assets/registry';

let errorCount = 0;

function fail(message: string): void {
  errorCount += 1;
  // eslint-disable-next-line no-console
  console.error(`✗ ${message}`);
}

// A Fact<T> must be internally consistent: confirmed => non-null value
// and source: 'client'; pending => null value and null source. Any
// other combination means the content file was hand-edited into an
// invalid state, which Fact<T>'s type alone doesn't fully prevent
// (e.g. someone could construct the object literal directly instead
// of going through confirmedFact()/pendingFact()).
const factSchema = <T extends z.ZodTypeAny>(inner: T) =>
  z
    .object({
      value: inner.nullable(),
      status: z.enum(['confirmed', 'pending']),
      source: z.enum(['client']).nullable(),
    })
    .refine(
      (fact) =>
        (fact.status === 'confirmed' && fact.value !== null && fact.source === 'client') ||
        (fact.status === 'pending' && fact.value === null && fact.source === null),
      { message: 'Fact<T> is internally inconsistent — status/value/source do not agree' }
    );

const urlLike = z.string().refine(
  (v) => v.startsWith('#') || v.startsWith('http://') || v.startsWith('https://') || v.startsWith('mailto:') || v.startsWith('tel:'),
  { message: 'must be an anchor (#...), tel:, mailto:, or http(s) URL' }
);

function checkFact(label: string, fact: unknown, innerSchema: z.ZodTypeAny = z.any()): void {
  const result = factSchema(innerSchema).safeParse(fact);
  if (!result.success) {
    fail(`${label}: ${result.error.issues.map((i) => i.message).join('; ')}`);
  }
}

function checkImageId(label: string, imageId: string | undefined): void {
  if (imageId && !(imageId in images)) {
    fail(`${label}: references imageId "${imageId}" not found in assets/registry.ts`);
  }
}

function checkDuplicateIds(label: string, items: { id: string }[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      fail(`${label}: duplicate id "${item.id}"`);
    }
    seen.add(item.id);
  }
}

// --- company ---
checkFact('company.category', company.category, z.string());
checkFact('company.positioningStatement', company.positioningStatement, z.string());
checkFact('company.yearsInBusiness', company.yearsInBusiness, z.number());
checkFact('company.projectsCompleted', company.projectsCompleted, z.number());
checkFact('company.regionsServed', company.regionsServed, z.string());
checkFact('company.logoId', company.logoId, z.string());
if (company.logoId.value) checkImageId('company.logoId', company.logoId.value);

// --- hero ---
checkFact('hero.heroImageId', hero.heroImageId, z.string());
if (hero.heroImageId.value) checkImageId('hero.heroImageId', hero.heroImageId.value);
if (!urlLike.safeParse(hero.primaryCta.target).success) {
  fail(`hero.primaryCta.target: "${hero.primaryCta.target}" is not a valid target`);
}

// --- services ---
checkDuplicateIds('services', services);
for (const service of services) {
  checkImageId(`services[${service.id}].imageId`, service.imageId);
  if (service.ctaHref && !urlLike.safeParse(service.ctaHref).success) {
    fail(`services[${service.id}].ctaHref: "${service.ctaHref}" is not a valid target`);
  }
}

// --- projects ---
checkDuplicateIds('projects', projects);
for (const project of projects) {
  project.imageIds.forEach((id, i) => checkImageId(`projects[${project.id}].imageIds[${i}]`, id));
  if (project.imageIds.length === 0) {
    fail(`projects[${project.id}]: has no images — Content Model requires at least one`);
  }
}

// --- evidence ---
checkDuplicateIds('evidence', evidence);
for (const item of evidence) {
  if (item.imageId) checkImageId(`evidence[${item.id}].imageId`, item.imageId);
}

// --- contact ---
checkFact('contact.phone', contact.phone, z.string());
checkFact('contact.whatsapp', contact.whatsapp, z.string());
checkFact('contact.email', contact.email, z.string().refine((v) => v.includes('@'), 'not a valid email'));
checkFact('contact.address', contact.address, z.string());
checkFact('contact.mapsUrl', contact.mapsUrl, urlLike);
checkFact('contact.businessHours', contact.businessHours, z.string());

// --- reference documents ---
for (const doc of referenceDocuments) {
  if (!urlLike.safeParse(doc.fileUrl).success) {
    fail(`referenceDocuments["${doc.label}"].fileUrl: "${doc.fileUrl}" is not a valid target`);
  }
}

if (errorCount > 0) {
  // eslint-disable-next-line no-console
  console.error(`\n${errorCount} content validation error(s) found. Fix src/content/site.ts before continuing.`);
  process.exit(1);
} else {
  // eslint-disable-next-line no-console
  console.log('✓ Content validation passed.');
}
