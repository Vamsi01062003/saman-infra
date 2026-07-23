# Firestore Schema & Security Rules — Design (Phase 2)

**Status: design only, unverified.** I have no Firebase project to
test this against — no credentials, no live console, no way to run
`firebase deploy --only firestore:rules` and check it actually
compiles or behaves as intended. Treat everything below as a
reviewable draft, not working infrastructure. First real step in a
normal environment: create the Firebase project, paste these rules
in, and test them with the Firestore Rules Playground before trusting
them in production.

## Collections

```
companyProfile/{main}        — singleton, see CompanyProfileDoc
properties/{propertyId}      — see Property
projects/{projectId}         — see CmsProject
testimonials/{testimonialId} — see Testimonial
gallery/{imageId}            — see GalleryImage
admins/{uid}                 — { email: string, addedAt: Timestamp }
                                (allow-list of who can write; keyed by
                                Firebase Auth uid, not editable by
                                anyone except via Firebase console —
                                deliberately not self-service)
```

## Security rules (draft — `firestore.rules`)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Public content: anyone can read published documents.
    // Only allow-listed admins can write, and only admins can read
    // drafts (published == false) — so unfinished content never
    // leaks to the public site.
    match /properties/{id} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }
    match /projects/{id} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }
    match /testimonials/{id} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }
    match /gallery/{id} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }

    // Singleton company profile: public read (it's the public site's
    // own content), admin-only write.
    match /companyProfile/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // The admin allow-list itself: no client writes at all. Adding
    // an admin is a deliberate out-of-band action (Firebase console
    // or a one-off script run by someone with project-owner access)
    // — never exposed as an in-app "add admin" button. This is a
    // safety choice: a compromised admin session should not be able
    // to grant itself more admins.
    match /admins/{uid} {
      allow read: if isAdmin();
      allow write: if false;
    }
  }
}
```

## Storage rules (draft — `storage.rules`)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
        firestore.exists(/databases/(default)/documents/admins/$(request.auth.uid));
    }
  }
}
```

Images live under `public/` in Storage (e.g.
`public/properties/{propertyId}/{filename}`) — publicly readable
(they're marketing images, not sensitive), admin-only upload.

## Why an allow-list collection instead of Firebase custom claims

Custom claims (the more common Firebase pattern for role-based access)
require a Cloud Function to set them, which means a paid Firebase plan
(Blaze) and a deploy step I can't test from here. The `admins/{uid}`
document approach works on the free Spark plan and is simpler to
reason about, at the cost of one extra document read per admin
security check. Reasonable tradeoff for a single-admin-or-few-admins
business site; revisit if the admin team grows significantly.

## Open question for whoever sets this up

How many people need admin access, and do they already have Google
accounts (simplifies auth to "Sign in with Google" restricted to an
allow-list) or do you want email/password accounts created manually?
This affects the Auth provider configuration in Phase 3 — worth
deciding before that phase starts rather than guessing.
