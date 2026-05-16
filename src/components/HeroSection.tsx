import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './HeroSection.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function LineReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="line-clip">
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const STATS = [
  { value: '500+',  label: 'Pieces Crafted'      },
  { value: '30+',   label: 'Countries Delivered' },
  { value: '100%',  label: 'Made to Order'       },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section className="hero" ref={sectionRef}>
      <motion.div
        className="hero__frame framed-media"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <motion.video
          style={{ y: videoY }}
          autoPlay loop muted playsInline
          className="hero__video"
          src={isMobile ? "/mobilehero.mp4" : "/hero.mp4"}
        />
        <div className="hero__overlay" />
      </motion.div>

      <div className="hero__content">
        <div className="hero__left">
          <motion.span
            className="hero__eyebrow eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Fine Furniture · Est. 2024
          </motion.span>

          <h1 className="hero__title">
            <LineReveal delay={0.5}>Objects of</LineReveal>
            <LineReveal delay={0.68}><em>Intention.</em></LineReveal>
          </h1>

          <motion.span
            className="hero__rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.95, ease: EASE }}
          />

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
          >
            Hyderabad's premier luxury furniture and interior design studio —
            hand-crafted stone dining tables, Italian leather sofas, and complete
            bespoke interiors. Every piece made exclusively to your specification,
            backed by 20 years of craft.
          </motion.p>
        </div>

        <motion.div
          className="hero__right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
        >
          <Link to="/collections" className="btn-primary hero__cta">
            Explore the Collection <ArrowRight size={16} strokeWidth={1.5} />
          </Link>

          <ul className="hero__stats">
            {STATS.map(({ value, label }) => (
              <li key={label} className="hero__stat">
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.span>
        <span className="hero__scroll-label">Scroll</span>
      </motion.div>
    </section>
  );
}
