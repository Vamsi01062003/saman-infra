import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { resolveImage } from '@/assets/registry';
import type { Project } from '@/types/content';

interface ProjectsProps {
  projects: Project[];
}

/**
 * ProjectCard — deliberately local to this file, not exported to
 * ui/. It renders project data as evidence of capability (problem /
 * solution / evidence), a structurally different shape from the
 * generic ui/Card — see Component Contract notes. Consumes extracted
 * photography and structured content only, never a raw client poster.
 */
function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  const primaryImage = resolveImage(project.imageIds[0]);

  return (
    <article
      className={`grid grid-cols-1 gap-l md:grid-cols-2 md:items-center ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div>
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={`${project.title} — project photograph`}
            className="aspect-[4/3] w-full rounded-s object-cover shadow-card"
            loading="lazy"
          />
        ) : (
          <div
            className="flex aspect-[4/3] w-full items-center justify-center rounded-s border border-dashed border-border text-s text-text-secondary"
            role="img"
            aria-label={`Photograph pending for ${project.title}`}
          >
            Photograph pending
          </div>
        )}
      </div>

      <div>
        {project.location ? <p className="eyebrow mb-xs">{project.location}</p> : null}
        <h3 className="heading-section mb-s">{project.title}</h3>

        <p className="body-text mb-s">
          <span className="font-semibold text-text-primary">Problem: </span>
          {project.problem}
        </p>
        <p className="body-text mb-s">
          <span className="font-semibold text-text-primary">Solution: </span>
          {project.solution}
        </p>
        <p className="body-text mb-m">
          <span className="font-semibold text-text-primary">Evidence: </span>
          {project.evidence}
        </p>

        <Button as="a" href="#contact" variant="ghost">
          {project.contactCtaLabel ?? 'Discuss a similar project'}
        </Button>
      </div>
    </article>
  );
}

/**
 * Projects — answers Content Model Question 3: "Can you prove it?"
 * Alternating media/text rhythm per Layout Contract.
 */
export default function Projects({ projects }: ProjectsProps) {
  return (
    <Section id="projects" label="Projects">
      <Container>
        <h2 className="heading-section mb-l">Our Work</h2>

        {projects.length === 0 ? (
          <p className="body-text italic text-text-secondary/60">
            Case studies pending — awaiting audited project photography and facts from the
            client.
          </p>
        ) : (
          <div className="flex flex-col gap-2xl">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} reverse={index % 2 === 1} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
