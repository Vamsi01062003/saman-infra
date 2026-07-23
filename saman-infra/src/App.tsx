import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/blocks/Hero';
import Services from '@/components/blocks/Services';
import Projects from '@/components/blocks/Projects';
import Evidence from '@/components/blocks/Evidence';
import Contact from '@/components/blocks/Contact';
import { company, hero, services, projects, evidence, contact, referenceDocuments } from '@/content/site';

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-s focus:top-s focus:z-[60] focus:rounded-s focus:bg-accent focus:px-m focus:py-s focus:text-surface-primary"
      >
        Skip to main content
      </a>

      <Navbar companyName={company.name} logoId={company.logoId.value ?? undefined} />

      <main id="main-content">
        <Hero company={company} hero={hero} />
        <Services services={services} />
        <Projects projects={projects} />
        <Evidence evidence={evidence} />
        <Contact contact={contact} />
      </main>

      <Footer company={company} contact={contact} referenceDocuments={referenceDocuments} />
    </>
  );
}
