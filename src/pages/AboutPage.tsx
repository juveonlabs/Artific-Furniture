import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import './AboutPage.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STATS = [
  { value: '20+',   label: 'Years of Legacy'       },
  { value: '3000+', label: 'Projects Across India'  },
  { value: '200+',  label: 'Global Projects'        },
  { value: '4',     label: 'Premium Showrooms'      },
];

const VALUES = [
  { title: 'Timeless Elegance',     body: 'Every piece is designed to transcend passing trends — rooted in proportion, material, and form that endure for generations.' },
  { title: 'Craftsmanship',         body: 'A hands-on approach to every detail. We work with makers who treat their craft as a lifelong pursuit, not a production line.' },
  { title: 'Client-Centred',        body: 'We start by understanding how you live — your goals, your lifestyle, your space. Every decision flows from that understanding.' },
  { title: 'Ethical Sourcing',      body: 'FSC-certified hardwoods, European artisan decor, Italian marble. We source with intention and full transparency on provenance.' },
];

const SERVICES = [
  'Complete Home Interiors',
  'Luxury Modular Kitchens & Wardrobes',
  'False Ceilings, Flooring & Wall Treatments',
  'Bathroom Designing & Premium Sanitary Fittings',
  'Custom & Imported Furniture Solutions',
  'Doors, Partitions & Carpentry Work',
  'End-to-End Project Execution & Site Management',
];

const PROCESS = [
  { num: '01', title: 'Consultation',    body: 'Understand client lifestyle, space requirements, and design goals in depth.' },
  { num: '02', title: 'Concept Design',  body: 'Develop vision boards, mood references, and initial spatial layouts.' },
  { num: '03', title: 'Detailed Design', body: 'Material selection, technical drawings, and specification sign-off.' },
  { num: '04', title: 'Procurement',     body: 'Custom builds, international ordering, and end-to-end logistics.' },
  { num: '05', title: 'Installation',    body: 'Final touches, art placement, and a full walkthrough with the client.' },
];

const MATERIALS = [
  'Italian Marble & Natural Stone',
  'Hand-Woven Textiles',
  'FSC-Certified Hardwood',
  'Full-Grain & Italian Leather',
  'European Artisan-Made Décor',
  'Premium Imported Fabrics',
];

const PROJECTS = [
  'Hillock Nature Retreat Resort',
  'Alanati Hotel',
  'Akan Pub',
  'Ramadevi Hospital',
  'Quake Arina Pub',
  'Samraksha Hospital',
  'Sancta Maria International School',
  'Manthan School',
];

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="about-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link to="/" className="about-hero__back">
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to home
            </Link>
          </motion.div>

          <motion.span
            className="eyebrow about-hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Est. 2023 · Hyderabad
          </motion.span>

          <motion.h1
            className="about-hero__title"
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            Inspired Spaces,<br /><em>Timeless Design.</em>
          </motion.h1>

          <motion.p
            className="about-hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
          >
            A family-built legacy of premium furniture and interior excellence —
            spanning over two decades, 3,000+ projects, and four flagship showrooms.
          </motion.p>
        </div>
      </div>

      {/* ── Brand Story ──────────────────────────────────── */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__grid">
            <FadeIn className="about-story__text">
              <span className="eyebrow">Our Story</span>
              <h2 className="about-story__title">
                Built on trust,<br /><em>not advertising.</em>
              </h2>
              <p className="about-story__body">
                Artific Furniture is a family-built premium brand with a legacy spanning over 20 years.
                Our journey began with <strong>Furniture Zone</strong>, an 8,000 sq.ft store founded by
                P. Show Reddy. In 2013, the family expanded into a 24,000 sq.ft premium destination —
                <strong> Metilli, Gachibowli</strong> — setting new standards for luxury interiors in Hyderabad.
              </p>
              <p className="about-story__body">
                In 2023, <strong>Artific Furniture, Mokila</strong> was founded — a 24,000 sq.ft showroom
                led by his daughters — and we are now preparing to open our fourth store,
                <strong> Artific Extension</strong>, in Toli Chowki.
              </p>
              <p className="about-story__body">
                What sets Artific apart is the founder's work ethic: an uncompromising commitment to
                client time, quality without exception, and a long-term high-trust clientele built
                entirely through reputation — without any social media presence.
              </p>
            </FadeIn>

            <FadeIn className="about-story__stats" delay={0.15}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="about-stat">
                  <span className="about-stat__value">{value}</span>
                  <span className="about-stat__label">{label}</span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────── */}
      <section className="about-philosophy">
        <span className="about-philosophy__deco" aria-hidden="true">"</span>
        <div className="container">
          <FadeIn>
            <span className="about-philosophy__eyebrow eyebrow">Design Philosophy</span>
            <blockquote className="about-philosophy__quote">
              Luxury is found in refined details,
              natural harmony, and <em>enduring quality.</em>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────── */}
      <section className="about-values">
        <div className="container">
          <FadeIn>
            <span className="eyebrow">Core Values</span>
            <h2 className="about-values__title">What we stand for</h2>
          </FadeIn>
          <div className="about-values__grid">
            {VALUES.map(({ title, body }, i) => (
              <FadeIn key={title} delay={i * 0.1} className="about-value">
                <span className="about-value__num">0{i + 1}</span>
                <h3 className="about-value__title">{title}</h3>
                <p className="about-value__body">{body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="about-services">
        <div className="container">
          <div className="about-services__grid">
            <FadeIn className="about-services__left">
              <span className="eyebrow">Services</span>
              <h2 className="about-services__title">
                Everything your<br /><em>space deserves.</em>
              </h2>
              <p className="about-services__desc">
                From a single bespoke piece to a complete turnkey interior — we handle every
                element of your space with the same care and precision.
              </p>
            </FadeIn>
            <FadeIn className="about-services__list" delay={0.12}>
              {SERVICES.map((s, i) => (
                <div key={s} className="about-service-item">
                  <span className="about-service-item__num">0{i + 1}</span>
                  <span className="about-service-item__text">{s}</span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Design Process ───────────────────────────────── */}
      <section id="process" className="about-process">
        <div className="container">
          <FadeIn>
            <span className="eyebrow">Design Process</span>
            <h2 className="about-process__title">
              Our five-step<br /><em>approach.</em>
            </h2>
          </FadeIn>
          <div className="about-process__steps">
            {PROCESS.map(({ num, title, body }, i) => (
              <FadeIn key={num} delay={i * 0.09} className="about-process__step">
                <span className="about-process__num">{num}</span>
                <h3 className="about-process__step-title">{title}</h3>
                <p className="about-process__step-body">{body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials ────────────────────────────────────── */}
      <section className="about-materials">
        <div className="container">
          <div className="about-materials__inner">
            <FadeIn className="about-materials__left">
              <span className="eyebrow">Materials & Sourcing</span>
              <h2 className="about-materials__title">
                Premium materials,<br /><em>sourced with intent.</em>
              </h2>
              <p className="about-materials__desc">
                Every material we specify has been chosen for its character, provenance, and longevity.
                We source from Italy, Turkey, and across Europe — always with full transparency.
              </p>
            </FadeIn>
            <FadeIn className="about-materials__list" delay={0.12}>
              {MATERIALS.map(m => (
                <div key={m} className="about-material-item">
                  <span className="about-material-item__dot" />
                  {m}
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Recent Projects ──────────────────────────────── */}
      <section className="about-projects">
        <div className="container">
          <FadeIn>
            <span className="eyebrow">2025 Projects</span>
            <h2 className="about-projects__title">
              A selection of<br /><em>recent work.</em>
            </h2>
          </FadeIn>
          <div className="about-projects__list">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p} delay={i * 0.06} className="about-project-item">
                <span className="about-project-item__num">0{i + 1}</span>
                <span className="about-project-item__name">{p}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section className="about-contact">
        <div className="container">
          <FadeIn>
            <span className="eyebrow">Get in Touch</span>
            <h2 className="about-contact__title">
              Begin your<br /><em>project with us.</em>
            </h2>
          </FadeIn>
          <div className="about-contact__details">
            <FadeIn className="about-contact__item" delay={0.18}>
              <span className="about-contact__label">Email</span>
              <span className="about-contact__value">Artificfurniture2023@gmail.com</span>
            </FadeIn>
            <FadeIn className="about-contact__item" delay={0.26}>
              <span className="about-contact__label">Showrooms</span>
              <span className="about-contact__value">Artific Furniture, Mokila — 24,000 sq.ft</span>
              <span className="about-contact__value">Metilli, Gachibowli — 24,000 sq.ft</span>
              <span className="about-contact__value">Artific Extension, Toli Chowki — Opening Soon</span>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
