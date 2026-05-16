import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './RecentWorksSection.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CLIENTS = [
  'Hillock Nature Retreat Resort',
  'Alanati Hotel',
  'Akan Pub',
  'Ramadevi Hospital',
  'Quake Arina Pub',
  'Samraksha Hospital',
  'Sancta Maria International School',
  'Manthan School',
];

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

export default function RecentWorksSection() {
  return (
    <section className="recent-works" aria-labelledby="recent-works-heading">
      <div className="container">
        <FadeIn>
          <span className="eyebrow">2025 Projects</span>
          <h2 id="recent-works-heading" className="recent-works__title">
            A selection of<br /><em>recent work.</em>
          </h2>
        </FadeIn>

        <div className="recent-works__list">
          {CLIENTS.map((client, i) => (
            <FadeIn key={client} delay={i * 0.06} className="recent-works__item">
              <span className="recent-works__item-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="recent-works__item-name">{client}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
