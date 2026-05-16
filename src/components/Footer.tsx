import { Link } from 'react-router-dom';
import './Footer.css';

type FooterLink = { label: string; to: string };

const nav: Record<string, FooterLink[]> = {
  Collections: [
    { label: 'Living Room', to: '/seating' },
    { label: 'Bedroom',     to: '/collections?category=Beds' },
    { label: 'Dining',      to: '/collections?category=Dining' },
    { label: 'Office',      to: '/collections?category=Office' },
    { label: 'Outdoor',     to: '/contact' },
  ],
  Studio: [
    { label: 'About',    to: '/about' },
    { label: 'Ateliers', to: '/ateliers' },
    { label: 'Process',  to: '/about#process' },
    { label: 'Contact',  to: '/contact' },
  ],
};

const legal: FooterLink[] = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms',   to: '/terms' },
  { label: 'Cookies', to: '/cookies' },
];

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/artific.furniture/' },
  { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61557574300304' },
];

export default function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="container">

        {/* Top row */}
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo-link">
              <img src="/logo.png" alt="Artific" className="footer__logo-img" />
            </Link>
            <p className="footer__tagline">
              Fine furniture for extraordinary<br />living spaces. Crafted to endure.
            </p>
          </div>

          <nav className="footer__nav">
            {Object.entries(nav).map(([group, links]) => (
              <div key={group} className="footer__nav-col">
                <span className="footer__nav-label">{group}</span>
                <ul>
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to} className="footer__nav-link">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="footer__nav-col">
              <span className="footer__nav-label">Follow</span>
              <ul>
                {social.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="footer__nav-link">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="footer__bar">
          <span>&copy; 2026 Artific Furniture. All rights reserved.</span>
          <div className="footer__bar-links">
            {legal.map(({ label, to }) => (
              <Link key={label} to={to}>{label}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
