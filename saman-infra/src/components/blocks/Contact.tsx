import { useRef, useState, type FormEvent } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import type { ContactInfo, ContactSubmission } from '@/types/content';

interface ContactProps {
  contact: ContactInfo;
}

type SubmitStatus = 'idle' | 'submitting' | 'invalid' | 'not_wired';

type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a raw submission and returns field-level errors.
 * Kept separate from the submit handler so it's easy to unit test
 * once a test setup exists, and so the "what counts as valid" rule
 * lives in one place rather than scattered across JSX conditions.
 */
function validate(submission: ContactSubmission): FieldErrors {
  const errors: FieldErrors = {};

  if (!submission.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!submission.email || !submission.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(submission.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!submission.message.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

/**
 * Contact — answers Content Model Question 5: "How do I contact you?"
 * Split layout on desktop. Client-side validation runs on submit
 * (the form uses `noValidate` deliberately, to replace native browser
 * validation with our own — that only holds if we actually validate,
 * which this does). Submission target is intentionally NOT wired to
 * an endpoint yet — a business decision (form backend, email service,
 * WhatsApp API) that needs agreement before shipping, not something
 * to guess at. The ContactSubmission type lets this UI and the
 * eventual backend be built independently — see README "Open Decisions".
 */
export default function Contact({ contact }: ContactProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submission: ContactSubmission = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    const fieldErrors = validate(submission);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus('invalid');
      // Move focus to the first invalid field so keyboard and
      // screen-reader users land directly on what needs fixing,
      // instead of relying solely on the aria-live announcement.
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        formRef.current?.querySelector<HTMLElement>(`#${firstErrorField}`)?.focus();
      }
      return;
    }

    // eslint-disable-next-line no-console
    console.log('Contact form submission (not yet wired to a backend):', submission);
    setStatus('not_wired');
  }

  const hasDirectDetails = contact.phone.value || contact.email.value || contact.address.value;

  return (
    <Section id="contact" label="Contact">
      <Container>
        <div className="grid grid-cols-1 gap-l md:grid-cols-2">
          <div>
            <h2 className="heading-section mb-m">Get in Touch</h2>

            {hasDirectDetails ? (
              <dl className="flex flex-col gap-s">
                {contact.phone.value ? (
                  <div>
                    <dt className="eyebrow">Phone</dt>
                    <dd className="body-text">
                      <a href={`tel:${contact.phone.value}`} className="!text-text-primary">
                        {contact.phone.value}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contact.whatsapp.value ? (
                  <div>
                    <dt className="eyebrow">WhatsApp</dt>
                    <dd className="body-text">
                      <a href={`https://wa.me/${contact.whatsapp.value}`} className="!text-text-primary">
                        {contact.whatsapp.value}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contact.email.value ? (
                  <div>
                    <dt className="eyebrow">Email</dt>
                    <dd className="body-text">
                      <a href={`mailto:${contact.email.value}`} className="!text-text-primary">
                        {contact.email.value}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contact.address.value ? (
                  <div>
                    <dt className="eyebrow">Address</dt>
                    <dd className="body-text">{contact.address.value}</dd>
                  </div>
                ) : null}
                {contact.businessHours.value ? (
                  <div>
                    <dt className="eyebrow">Business Hours</dt>
                    <dd className="body-text">{contact.businessHours.value}</dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              <p className="body-text italic text-text-secondary/60">
                Contact details pending — awaiting client input.
              </p>
            )}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-s">
            <div>
              <label htmlFor="name" className="eyebrow mb-xs block">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full rounded-s border border-border px-s py-s text-s"
              />
              {errors.name ? (
                <p id="name-error" role="alert" className="mt-xs text-xs text-danger">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="eyebrow mb-xs block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full rounded-s border border-border px-s py-s text-s"
              />
              {errors.email ? (
                <p id="email-error" role="alert" className="mt-xs text-xs text-danger">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="eyebrow mb-xs block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="w-full rounded-s border border-border px-s py-s text-s"
              />
              {errors.message ? (
                <p id="message-error" role="alert" className="mt-xs text-xs text-danger">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <Button type="submit" variant="primary">
              Send Message
            </Button>

            <div aria-live="polite" className="text-xs text-text-secondary">
              {status === 'invalid'
                ? 'Please fix the highlighted fields above.'
                : status === 'not_wired'
                  ? 'Form submission is not yet connected — see project README.'
                  : null}
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
