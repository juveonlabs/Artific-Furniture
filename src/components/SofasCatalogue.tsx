import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useEnquire } from '../context/EnquireContext';
import './SofasCatalogue.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SofaItem {
  id: number;
  src: string;
  material: string;
  type: string;
  wide: boolean;
}

const SOFAS: SofaItem[] = [
  { id:  1, src: '/sofas/p1_1.png',  material: 'Full-Grain Leather', type: 'Sectional', wide: true  },
  { id:  2, src: '/sofas/p19_1.png', material: 'Full-Grain Leather', type: 'Armchair',  wide: false },
  { id:  3, src: '/sofas/p5_1.png',  material: 'Full-Grain Leather', type: 'Sectional', wide: false },
  { id:  4, src: '/sofas/p8_1.png',  material: 'Italian Leather',    type: 'Sectional', wide: true  },
  { id:  5, src: '/sofas/p30_1.png', material: 'Full-Grain Leather', type: 'Armchair',  wide: false },
  { id:  6, src: '/sofas/p12_1.png', material: 'Italian Leather',    type: 'Sectional', wide: false },
  { id:  7, src: '/sofas/p35_1.png', material: 'Premium Leather',    type: 'Sofa',      wide: false },
  { id:  8, src: '/sofas/p39_1.png', material: 'Italian Leather',    type: 'Armchair',  wide: false },
  { id:  9, src: '/sofas/p41_1.png', material: 'Full-Grain Leather', type: 'Sectional', wide: true  },
  { id: 10, src: '/sofas/p48_1.png', material: 'Bouclé Fabric',      type: 'Armchair',  wide: false },
  { id: 11, src: '/sofas/p25_1.png', material: 'Italian Leather',    type: 'Sofa',      wide: false },
  { id: 12, src: '/sofas/p54_1.png', material: 'Premium Leather',    type: 'Suite',     wide: true  },
  { id: 13, src: '/sofas/p57_1.png', material: 'Full-Grain Leather', type: 'Armchair',  wide: false },
  { id: 14, src: '/sofas/p61_1.png', material: 'Full-Grain Leather', type: 'Sofa',      wide: false },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.065 },
  }),
};

function SofaCard({ item, index }: { item: SofaItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { open } = useEnquire();

  return (
    <motion.div
      ref={ref}
      className={`sofa-card${item.wide ? ' sofa-card--wide' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index % 4}
    >
      <div className="sofa-card__media">
        <img
          src={item.src}
          alt={item.material}
          className="sofa-card__img"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="sofa-card__info">
        <div className="sofa-card__details">
          <h3 className="sofa-card__material">{item.material}</h3>
          <span className="sofa-card__type">{item.type}</span>
        </div>
        <button className="sofa-card__enquire" onClick={() => open(`${item.material} — ${item.type}`)}>
          Enquire
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function SofasCatalogue({ hideHeader }: { hideHeader?: boolean } = {}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="sofas">
      {!hideHeader && (
        <div className="container">
          <motion.div
            ref={headerRef}
            className="sofas__header"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="eyebrow">Sofas &amp; Seating</span>
            <div className="sofas__header-body">
              <h2 className="sofas__title">
                The Living<br /><em>Collection</em>
              </h2>
              <p className="sofas__desc">
                From generous leather sectionals to singular statement armchairs —
                each piece is upholstered in full-grain Italian leather or premium fabric.
                Fully configurable to your colour, dimension, and leg finish.
                Lead time 8–12 weeks.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      <div className="sofas__grid-wrap">
        <div className="sofas__grid">
          {SOFAS.map((item, i) => (
            <SofaCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div
          className="sofas__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="sofas__footer-note">
            All upholstery colours, leg finishes, and configurations are available on request. Lead time 8–12 weeks.
          </p>
          <a href="#contact" className="btn-outline">Book a Showroom Visit</a>
        </motion.div>
      </div>
    </section>
  );
}
