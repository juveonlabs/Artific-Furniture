import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SofasCatalogue from '../components/SofasCatalogue';
import Footer from '../components/Footer';
import './SeatingPage.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SeatingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <>
      <div className="seating-hero" ref={heroRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link to="/" className="seating-hero__back">
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to home
            </Link>
          </motion.div>

          <motion.span
            className="eyebrow seating-hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Sofas &amp; Seating
          </motion.span>

          <motion.h1
            className="seating-hero__title"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            The Living<br /><em>Collection</em>
          </motion.h1>

          <motion.p
            className="seating-hero__desc"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            From sweeping leather sectionals to single statement armchairs —
            each piece is crafted for life in motion. Available in full-grain leather,
            Italian leather, and premium fabric. All configurable to order.
          </motion.p>
        </div>
      </div>

      <SofasCatalogue hideHeader />
      <Footer />
    </>
  );
}
