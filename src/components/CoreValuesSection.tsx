import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CoreValuesSection.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VALUES = [
  {
    num: '01',
    title: 'Timeless Elegance',
    body: 'Every piece transcends passing trends — rooted in proportion, material, and form that endure for generations.',
  },
  {
    num: '02',
    title: 'Craftsmanship',
    body: 'A hands-on approach to every detail. We work with makers who treat their craft as a lifelong pursuit.',
  },
  {
    num: '03',
    title: 'Client-Centred',
    body: 'We start by understanding how you live. Every decision flows from your goals, lifestyle, and space.',
  },
  {
    num: '04',
    title: 'Ethical Sourcing',
    body: 'FSC-certified hardwoods, European artisan décor, Italian marble — sourced with full transparency.',
  },
];

function ValueCard({
  num,
  title,
  body,
  index,
}: {
  num: string;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      className="core-values__card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay: index * 0.1, ease: EASE }}
    >
      <span className="core-values__card-num" aria-hidden="true">{num}</span>
      <div className="core-values__card-accent" aria-hidden="true" />
      <h3 className="core-values__card-title">{title}</h3>
      <p className="core-values__card-body">{body}</p>
    </motion.article>
  );
}

export default function CoreValuesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="core-values" aria-labelledby="core-values-heading">
      <motion.div
        className="core-values__glow"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      <motion.div
        className="core-values__rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <motion.div className="container">
        <div className="core-values__header" ref={headerRef}>
          <motion.div
            className="core-values__header-left"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE }}
          >
            <span className="eyebrow">Core Values</span>
            <h2 id="core-values-heading" className="core-values__title">
              What we<br /><em>stand for.</em>
            </h2>
          </motion.div>

          <motion.p
            className="core-values__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
          >
            Four principles guide every commission — from a single bespoke piece
            to a complete turnkey interior across India and beyond.
          </motion.p>
        </div>

        <motion.div className="core-values__grid">
          {VALUES.map((v, i) => (
            <ValueCard key={v.num} {...v} index={i} />
          ))}
        </motion.div>

        <motion.div
          className="core-values__footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          <Link to="/about" className="core-values__link">
            Our full story <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
