import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './StatementBand.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const COLLECTIONS = [
  { id: 1, name: 'Sofas',    sub: 'Sectionals & Armchairs', image: '/sofas/p1_1.png',       span: 'wide' as const },
  { id: 2, name: 'Beds',     sub: 'Bedroom Essentials',     image: '/beds/p10_1.png'                             },
  { id: 3, name: 'Office',   sub: 'Workspace Collection',   image: '/office/p10_1.png'                           },
  { id: 4, name: 'Consoles', sub: 'Entryway & Accent',      image: '/consoles/p10_1.png',   span: 'wide' as const },
];


export default function StatementBand() {
  return (
    <section className="statement">
      <span className="statement__deco" aria-hidden="true">"</span>

      <div className="container">

        <div className="statement__header">
          <motion.span
            className="statement__eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Explore
          </motion.span>

          <motion.h2
            className="statement__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            Our <em>Collections</em>
          </motion.h2>
        </div>

        <div className="statement__grid">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              className={`col-card${col.span === 'wide' ? ' col-card--wide' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: 0.08 * i, ease: EASE }}
            >
              <Link to="/collections" className="col-card__media">
                <img src={col.image} alt={col.name} className="col-card__img" loading="lazy" />
                <div className="col-card__overlay" />
              </Link>
              <div className="col-card__body">
                <div>
                  <span className="col-card__sub">{col.sub}</span>
                  <Link to="/collections"><h3 className="col-card__name">{col.name}</h3></Link>
                </div>
                <Link to="/collections" className="col-card__arrow">
                  <ArrowRight size={17} strokeWidth={1.2} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="statement__footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        >
          <Link to="/collections" className="statement__view-all">
            View All
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
