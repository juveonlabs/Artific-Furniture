import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Collections from '../components/Collections';
import Footer from '../components/Footer';
import './CollectionsPage.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HERO_CATEGORIES = [
  { label: 'Sofas',         count: 14 },
  { label: 'Beds',          count: 20 },
  { label: 'Office',        count: 27 },
  { label: 'Consoles',      count: 19 },
  { label: 'Dining Tables', count: 12 },
];

export default function CollectionsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <>
      <div className="collections-hero" ref={heroRef}>
        <div className="container">
          <div className="collections-hero__inner">

            <div className="collections-hero__left">
              <motion.span
                className="eyebrow collections-hero__eyebrow"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              >
                The Collection
              </motion.span>

              <motion.h1
                className="collections-hero__title"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
              >
                Every piece,<br />a <em>considered</em><br />object.
              </motion.h1>

              <motion.p
                className="collections-hero__desc"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
              >
                Sculptural forms, hand-selected materials, made to order —
                each piece designed to anchor a room for generations.
              </motion.p>
            </div>

            <motion.div
              className="collections-hero__right"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.42, ease: EASE }}
            >
              <span className="collections-hero__right-label">Categories</span>
              <ul className="collections-hero__cats">
                {HERO_CATEGORIES.map(({ label, count }) => (
                  <li key={label} className="collections-hero__cat">
                    <span className="collections-hero__cat-name">{label}</span>
                    <span className="collections-hero__cat-count">{count}</span>
                  </li>
                ))}
              </ul>
              <div className="collections-hero__total">
                <span>Total</span>
                <span>92</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Collections hideHeader />
      <Footer />
    </>
  );
}
