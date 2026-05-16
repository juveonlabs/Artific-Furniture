import { motion } from 'framer-motion';
import './EthosStrip.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PILLARS = [
  {
    num: 'I',
    title: 'Material',
    body: 'Every surface begins as a hand-selected slab — sourced from European quarries and Italian tanneries chosen for their singular character.',
  },
  {
    num: 'II',
    title: 'Craft',
    body: 'Made entirely to order. Each piece is finished by master artisans to your exact dimension, material, and configuration.',
  },
  {
    num: 'III',
    title: 'Atelier',
    body: 'From first sketch to final delivery, our studio works with you directly — no intermediaries, no compromises.',
  },
];

export default function EthosStrip() {
  return (
    <section className="ethos">
      <div className="container">
        <div className="ethos__grid">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              className="ethos__pillar"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <span className="ethos__num">{p.num}</span>
              <h3 className="ethos__title">{p.title}</h3>
              <p className="ethos__body">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
