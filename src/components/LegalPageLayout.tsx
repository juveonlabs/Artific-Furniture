import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';
import './LegalPageLayout.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageLayoutProps {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  relatedLinks?: { label: string; to: string }[];
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  relatedLinks,
}: LegalPageLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <motion.div className="legal-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link to="/" className="legal-hero__back">
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to home
            </Link>
          </motion.div>

          <motion.span
            className="eyebrow legal-hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            className="legal-hero__title"
            initial={{ opacity: 0, y: 28 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.18, ease: EASE }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="legal-hero__intro"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            {intro}
          </motion.p>

          <motion.p
            className="legal-hero__updated"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </motion.div>

      <section className="legal-body">
        <div className="container">
          <div className="legal-body__grid">
            <nav className="legal-nav" aria-label="On this page">
              <span className="legal-nav__label">Contents</span>
              <ul className="legal-nav__list">
                {sections.map(({ id, title: sectionTitle }) => (
                  <li key={id}>
                    <a href={`#${id}`} className="legal-nav__link">
                      {sectionTitle}
                    </a>
                  </li>
                ))}
              </ul>
              {relatedLinks && relatedLinks.length > 0 && (
                <div className="legal-nav__related">
                  <span className="legal-nav__label">Related</span>
                  <ul className="legal-nav__list">
                    {relatedLinks.map(({ label, to }) => (
                      <li key={to}>
                        <Link to={to} className="legal-nav__link">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </nav>

            <div className="legal-content">
              {sections.map((section, i) => (
                <FadeIn key={section.id} delay={i * 0.04} className="legal-section">
                  <h2 id={section.id} className="legal-section__title">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((text, j) => (
                    <p key={j} className="legal-section__text">{text}</p>
                  ))}
                  {section.list && (
                    <ul className="legal-section__list">
                      {section.list.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
