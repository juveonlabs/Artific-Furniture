import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import './AteliersPage.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ATELIERS = [
  {
    num: '01',
    name: 'Artific Furniture',
    location: 'Mokila, Hyderabad',
    size: '24,000 sq.ft',
    status: 'Open',
    soon: false,
    since: '2023',
    desc: 'Our flagship destination — a 24,000 sq.ft immersive space spanning the full Artific collection. Led by the founder\'s daughters, this showroom brings together bespoke furniture, modular solutions, and complete interior design services under one roof.',
    tags: ['Furniture', 'Modular Kitchens', 'Full Interiors', 'Consultation'],
  },
  {
    num: '02',
    name: 'Metilli',
    location: 'Gachibowli, Hyderabad',
    size: '24,000 sq.ft',
    status: 'Open',
    soon: false,
    since: '2013',
    desc: 'A 24,000 sq.ft premium destination that set a new standard for luxury interiors in Hyderabad. Established in 2013 as an expansion of the original Furniture Zone, Metilli represents over a decade of refined taste and a high-trust clientele built entirely through reputation.',
    tags: ['Luxury Furniture', 'Premium Interiors', 'Stone & Marble'],
  },
  {
    num: '03',
    name: 'Artific Extension',
    location: 'Toli Chowki, Hyderabad',
    size: 'Coming Soon',
    status: 'Opening Soon',
    soon: true,
    since: null,
    desc: 'Our fourth showroom, arriving in Toli Chowki. An extension of the Artific philosophy into a new neighbourhood — bringing the same standard of premium furniture and bespoke interior services to a wider Hyderabad clientele.',
    tags: ['Opening Soon'],
  },
];

function AtelierPanel({ atelier, index }: { atelier: typeof ATELIERS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`atelier-panel${atelier.soon ? ' atelier-panel--soon' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.08, ease: EASE }}
    >
      <span className="atelier-panel__ghost" aria-hidden="true">{atelier.num}</span>

      <div className="atelier-panel__top">
        <span className="atelier-panel__num">{atelier.num}</span>
        <span className={`atelier-panel__status${atelier.soon ? ' atelier-panel__status--soon' : ''}`}>
          <span className="atelier-panel__dot" />
          {atelier.status}
        </span>
      </div>

      <h2 className="atelier-panel__name">{atelier.name}</h2>
      <p className="atelier-panel__location">{atelier.location}</p>

      <div className="atelier-panel__rule" />

      <div className="atelier-panel__body">
        <p className="atelier-panel__desc">{atelier.desc}</p>

        <div className="atelier-panel__meta">
          <div className="atelier-panel__stat">
            <span className="atelier-panel__stat-label">Floor Area</span>
            <span className="atelier-panel__stat-value">{atelier.size}</span>
          </div>
          {atelier.since && (
            <div className="atelier-panel__stat">
              <span className="atelier-panel__stat-label">Established</span>
              <span className="atelier-panel__stat-value">{atelier.since}</span>
            </div>
          )}
          <div className="atelier-panel__tags">
            {atelier.tags.map(tag => (
              <span key={tag} className="atelier-panel__tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AteliersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="ateliers-hero" ref={heroRef}>
        <div className="container">
          <div className="ateliers-hero__inner">
            <motion.span
              className="eyebrow ateliers-hero__eyebrow"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            >
              Our Spaces
            </motion.span>

            <motion.h1
              className="ateliers-hero__title"
              initial={{ opacity: 0, y: 36 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.16, ease: EASE }}
            >
              Where craft<br />meets<br /><em>conversation.</em>
            </motion.h1>
          </div>

          <motion.div
            className="ateliers-hero__foot"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.38, ease: EASE }}
          >
            <p className="ateliers-hero__desc">
              Each Artific atelier is a curated environment designed not just to
              display furniture, but to show how exceptional pieces transform
              a space. Walk through complete room settings, speak to our
              design team, and experience every material in person.
            </p>

            <div className="ateliers-hero__stats">
              <div className="ateliers-hero__stat">
                <span className="ateliers-hero__stat-value">3</span>
                <span className="ateliers-hero__stat-label">Showrooms</span>
              </div>
              <div className="ateliers-hero__stat-divider" />
              <div className="ateliers-hero__stat">
                <span className="ateliers-hero__stat-value">48,000</span>
                <span className="ateliers-hero__stat-label">sq.ft of Space</span>
              </div>
              <div className="ateliers-hero__stat-divider" />
              <div className="ateliers-hero__stat">
                <span className="ateliers-hero__stat-value">20+</span>
                <span className="ateliers-hero__stat-label">Years in Hyderabad</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Showrooms ─────────────────────────────────────── */}
      <section className="ateliers-list">
        <div className="container">
          {ATELIERS.map((atelier, i) => (
            <AtelierPanel key={atelier.num} atelier={atelier} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="ateliers-cta">
        <div className="container">
          <div className="ateliers-cta__inner">
            <motion.blockquote
              className="ateliers-cta__quote"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE }}
            >
              "No appointment necessary — walk in,<br />
              explore at your own pace."
            </motion.blockquote>

            <motion.div
              className="ateliers-cta__action"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <div>
                <span className="eyebrow ateliers-cta__eyebrow">Plan a Visit</span>
                <p className="ateliers-cta__sub">
                  Our consultants are available six days a week.
                </p>
              </div>
              <Link to="/contact" className="btn-primary ateliers-cta__btn">
                Book a Consultation <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
