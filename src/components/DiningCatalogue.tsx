import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useEnquire } from '../context/EnquireContext';
import './DiningCatalogue.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TableItem {
  id: number;
  src: string;
  material: string;
  seats: string;
  wide: boolean;
}

const TABLES: TableItem[] = [
  { id:  1, src: '/catalogue/p5_1.png',  material: 'Verde Imperiale',    seats: '8–10 seats',  wide: true  },
  { id:  2, src: '/catalogue/p2_1.png',  material: 'Sintered Stone',     seats: '6–8 seats',   wide: false },
  { id:  3, src: '/catalogue/p8_1.png',  material: 'Carrara Marble',     seats: '6 seats',     wide: false },
  { id:  4, src: '/catalogue/p1_1.png',  material: 'Statuario Marble',   seats: '8–12 seats',  wide: false },
  { id:  5, src: '/catalogue/p12_1.png', material: 'Black Granite',      seats: '10–12 seats', wide: true  },
  { id:  6, src: '/catalogue/p10_1.png', material: 'Noir Marquina',      seats: '6 seats',     wide: false },
  { id:  7, src: '/catalogue/p4_1.png',  material: 'White Sintered',     seats: '8 seats',     wide: true  },
  { id:  8, src: '/catalogue/p6_1.png',  material: 'Calacatta Gold',     seats: '10–14 seats', wide: false },
  { id:  9, src: '/catalogue/p14_1.png', material: 'Nero Marquina',      seats: '8 seats',     wide: false },
  { id: 10, src: '/catalogue/p3_1.png',  material: 'Natural Granite',    seats: '6–8 seats',   wide: true  },
  { id: 11, src: '/catalogue/p16_1.png', material: 'Sintered Stone',     seats: '4–6 seats',   wide: false },
  { id: 12, src: '/catalogue/p18_1.png', material: 'Natural Stone',      seats: '8–10 seats',  wide: false },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.07 },
  }),
};

function CatalogueCard({ item, index }: { item: TableItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { open } = useEnquire();

  return (
    <motion.div
      ref={ref}
      className={`dining-card${item.wide ? ' dining-card--wide' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index % 4}
    >
      <div className="dining-card__media">
        <img
          src={item.src}
          alt={item.material}
          className="dining-card__img"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="dining-card__info">
        <div className="dining-card__details">
          <h3 className="dining-card__material">{item.material}</h3>
          <span className="dining-card__seats">{item.seats}</span>
        </div>
        <button className="dining-card__enquire" onClick={() => open(`${item.material} — ${item.seats}`)}>
          Enquire
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function DiningCatalogue() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="dining">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="dining__header"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="dining__header-left">
            <span className="eyebrow">Dining Tables</span>
            <h2 className="dining__title">
              The Dining<br /><em>Collection</em>
            </h2>
          </div>
          <p className="dining__desc">
            Each table begins as a single slab of hand-selected natural stone —
            Carrara, Calacatta Gold, Verde Imperiale, Noir Marquina. Paired with
            bespoke chair programmes and finished to your exact dimension.
            All pieces made to order, available for private consultation.
          </p>
        </motion.div>
      </div>

      <div className="dining__grid-wrap">
        <div className="dining__grid">
          {TABLES.map((item, i) => (
            <CatalogueCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div
          className="dining__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="dining__footer-note">
            Shown in selected finishes. Custom dimensions, materials, and chair combinations available on request.
          </p>
          <a href="#contact" className="btn-outline">Request a Consultation</a>
        </motion.div>
      </div>
    </section>
  );
}
