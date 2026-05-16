import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const links = [
  { label: 'Collections', href: '/collections', route: true },
  { label: 'About',       href: '/about',        route: true },
  { label: 'Ateliers',    href: '/ateliers', route: true       },
  { label: 'Contact',     href: '/contact',  route: true     },
];

const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const overlayVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: EASE_IN_OUT } },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.7, ease: EASE_IN_OUT } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE_OUT },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, delay: i * 0.05, ease: EASE_IN_OUT },
  }),
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 40);
      setLight(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className={`navbar${compact ? ' navbar--compact' : ''}${light ? ' navbar--light' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="/" className="navbar__logo" onClick={close}>ARTIFIC</a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {links.map(({ label, href, route }) =>
            route
              ? <Link key={label} to={href} className="navbar__link">{label}</Link>
              : <a key={label} href={href} className="navbar__link">{label}</a>
          )}
        </nav>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Menu size={20} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="navbar__toggle-label">{open ? 'Close' : 'Menu'}</span>
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <nav className="nav-overlay__links" aria-label="Mobile navigation">
              {links.map(({ label, href, route }, i) =>
                route ? (
                  <motion.div
                    key={label}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link to={href} className="nav-overlay__link" onClick={close}>
                      <span className="nav-overlay__index">0{i + 1}</span>
                      {label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={label}
                    href={href}
                    className="nav-overlay__link"
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={close}
                  >
                    <span className="nav-overlay__index">0{i + 1}</span>
                    {label}
                  </motion.a>
                )
              )}
            </nav>

            <motion.div
              className="nav-overlay__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <a href="https://www.instagram.com/artific.furniture/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61557574300304" target="_blank" rel="noopener noreferrer">Facebook</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
