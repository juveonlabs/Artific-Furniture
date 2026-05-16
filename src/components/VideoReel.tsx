import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Pause } from 'lucide-react';
import './VideoReel.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const clips = [
  {
    id: 1, index: '01', category: 'Seating', name: 'Velvet Weave',
    desc: 'Hand-stitched velvet over a solid walnut frame. Every seam placed by eye.',
    src: 'https://cdn.pixabay.com/video/2022/01/21/105260-669527666_large.mp4',
    poster: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2, index: '02', category: 'Surfaces', name: 'Oak Grain',
    desc: 'Solid white oak with a hand-rubbed oil finish. Each grain pattern is unique.',
    src: 'https://cdn.pixabay.com/video/2019/11/20/29214-374122798_large.mp4',
    poster: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3, index: '03', category: 'Material', name: 'Marble Detail',
    desc: 'Quarried Calacatta marble, book-matched and sealed with nano-ceramic coating.',
    src: 'https://cdn.pixabay.com/video/2020/07/14/44780-440340904_large.mp4',
    poster: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4, index: '04', category: 'Lighting', name: 'Brass Finish',
    desc: 'Brushed brass hardware aged in-studio for an authentic patina, never painted.',
    src: 'https://cdn.pixabay.com/video/2021/10/02/90730-629459971_large.mp4',
    poster: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5, index: '05', category: 'Form', name: 'Clean Geometry',
    desc: 'Proportions derived from the golden ratio — balance you feel before you see.',
    src: 'https://cdn.pixabay.com/video/2021/03/15/68198-524800032_large.mp4',
    poster: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function VideoReel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [vidProgress, setVidProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = clips[activeIdx];

  const go = (idx: number) => setActiveIdx((idx + clips.length) % clips.length);

  /* Reset progress and play state when clip changes */
  useEffect(() => {
    setVidProgress(0);
    setPlaying(true);
  }, [activeIdx]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setVidProgress(v.currentTime / v.duration);
  };

  return (
    <section className="reel">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          className="reel__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div>
            <span className="eyebrow reel__eyebrow">Behind The Design</span>
            <h2 className="reel__title">
              Every detail,<br /><em>considered.</em>
            </h2>
          </div>
          {/* counter */}
          <motion.span
            className="reel__counter"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                0{activeIdx + 1}
              </motion.span>
            </AnimatePresence>
            &nbsp;/ 0{clips.length}
          </motion.span>
        </motion.div>

        {/* ── Main layout ── */}
        <motion.div
          className="reel__layout"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
        >

          {/* ── Left: player ── */}
          <div className="reel__player">
            <div className="reel__player-frame">

              <AnimatePresence mode="wait">
                <motion.video
                  key={active.id}
                  ref={videoRef}
                  className="reel__player-video"
                  src={active.src}
                  poster={active.poster}
                  autoPlay loop muted playsInline
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={onTimeUpdate}
                />
              </AnimatePresence>

              {/* Gradient */}
              <div className="reel__player-overlay" />

              {/* Meta — bottom left */}
              <div className="reel__player-meta">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    className="reel__player-meta-text"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <span className="reel__player-cat">{active.category}</span>
                    <h3 className="reel__player-name">{active.name}</h3>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="reel__controls">
                  <button className="reel__ctrl-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                    {playing ? <Pause size={13} strokeWidth={1.5} /> : <Play size={13} strokeWidth={1.5} />}
                  </button>
                  <button className="reel__ctrl-btn" onClick={() => go(activeIdx - 1)} aria-label="Previous">
                    <ArrowLeft size={13} strokeWidth={1.5} />
                  </button>
                  <button className="reel__ctrl-btn" onClick={() => go(activeIdx + 1)} aria-label="Next">
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Video progress bar */}
              <div className="reel__vidprogress">
                <div
                  className="reel__vidprogress-fill"
                  style={{ transform: `scaleX(${vidProgress})` }}
                />
              </div>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                className="reel__player-desc"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {active.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── Right: clip list ── */}
          <nav className="reel__list" aria-label="Design clips">
            {clips.map((clip, i) => (
              <button
                key={clip.id}
                className={`reel__item${i === activeIdx ? ' reel__item--active' : ''}`}
                onClick={() => go(i)}
              >
                {/* Thumbnail */}
                <div className="reel__item-thumb">
                  <img src={clip.poster} alt={clip.name} loading="lazy" />
                  {i === activeIdx && (
                    <motion.div
                      className="reel__item-thumb-bar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: vidProgress }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>

                {/* Text */}
                <span className="reel__item-body">
                  <span className="reel__item-name">{clip.name}</span>
                  <span className="reel__item-cat">{clip.category}</span>
                </span>

                {/* Arrow */}
                <motion.span
                  className="reel__item-arrow"
                  animate={{ x: i === activeIdx ? 0 : -6, opacity: i === activeIdx ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <ArrowRight size={12} strokeWidth={1.5} />
                </motion.span>
              </button>
            ))}
          </nav>

        </motion.div>
      </div>
    </section>
  );
}
