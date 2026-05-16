import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './FeaturedSection.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const items = [
  {
    index: '01',
    category: 'Seating',
    name: 'The Velvet Accent',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    size: 'large',
  },
  {
    index: '02',
    category: 'Surfaces',
    name: 'Oak Center Table',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    size: 'small',
  },
  {
    index: '03',
    category: 'Lighting',
    name: 'Ambient Sculptures',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867ff91?auto=format&fit=crop&w=900&q=80',
    size: 'small',
  },
] as const;

export default function FeaturedSection() {
  return (
    <section className="featured">
      <div className="container">

        {/* Header row */}
        <div className="featured__header">
          <motion.div
            className="featured__header-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
          >
            <span className="eyebrow">Featured Works</span>
            <h2 className="featured__title">
              Curated pieces for<br />the extraordinary.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button className="btn-outline">
              View Archive <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="featured__grid">
          {/* Left — large portrait */}
          <motion.div
            className="featured__card featured__card--large"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div
              className="featured__card-img"
              style={{ backgroundImage: `url(${items[0].image})` }}
            >
              <div className="featured__card-overlay" />
              <div className="featured__card-caption">
                <span className="featured__card-index">{items[0].index} — {items[0].category}</span>
                <h3 className="featured__card-name">{items[0].name}</h3>
              </div>
            </div>
          </motion.div>

          {/* Right — two stacked */}
          <div className="featured__col">
            {items.slice(1).map((item, i) => (
              <motion.div
                key={item.index}
                className="featured__card featured__card--small"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
              >
                <div
                  className="featured__card-img"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="featured__card-overlay" />
                  <div className="featured__card-caption">
                    <span className="featured__card-index">{item.index} — {item.category}</span>
                    <h3 className="featured__card-name featured__card-name--sm">{item.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
