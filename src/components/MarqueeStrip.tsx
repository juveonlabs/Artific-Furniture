import './MarqueeStrip.css';

const WORDS = 'CRAFTED  ·  TIMELESS  ·  BESPOKE  ·  ARTISANAL  ·  MADE TO ORDER  ·  FINE FURNITURE  ·  ';

export default function MarqueeStrip({ inverted }: { inverted?: boolean }) {
  return (
    <div className={`marquee${inverted ? ' marquee--inverted' : ''}`} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="marquee__text">{WORDS}</span>
        ))}
      </div>
    </div>
  );
}
