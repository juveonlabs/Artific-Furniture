import {} from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquire } from '../context/EnquireContext';
import './Collections.css';

const CATEGORIES = ['All', 'Sofas', 'Beds', 'Office', 'Consoles', 'Dining'] as const;
type Category = typeof CATEGORIES[number];

interface Product {
  id: number;
  category: string;
  material: string;
  detail: string;
  image: string;
  span?: 'wide';
}

const products: Product[] = [
  // ── Dining ──────────────────────────────────────────────
  { id:  1, category: 'Dining',  material: 'Verde Imperiale',  detail: '8–10 seats',  image: '/catalogue/p5_1.png',  span: 'wide' },
  { id:  2, category: 'Dining',  material: 'Sintered Stone',   detail: '6–8 seats',   image: '/catalogue/p2_1.png'  },
  { id:  3, category: 'Dining',  material: 'Carrara Marble',   detail: '6 seats',     image: '/catalogue/p8_1.png'  },
  { id:  4, category: 'Dining',  material: 'Statuario Marble', detail: '8–12 seats',  image: '/catalogue/p1_1.png'  },
  { id:  5, category: 'Dining',  material: 'Black Granite',    detail: '10–12 seats', image: '/catalogue/p12_1.png', span: 'wide' },
  { id:  6, category: 'Dining',  material: 'Noir Marquina',    detail: '6 seats',     image: '/catalogue/p10_1.png' },
  { id:  7, category: 'Dining',  material: 'White Sintered',   detail: '8 seats',     image: '/catalogue/p4_1.png',  span: 'wide' },
  { id:  8, category: 'Dining',  material: 'Calacatta Gold',   detail: '10–14 seats', image: '/catalogue/p6_1.png'  },
  { id:  9, category: 'Dining',  material: 'Nero Marquina',    detail: '8 seats',     image: '/catalogue/p14_1.png' },
  { id: 10, category: 'Dining',  material: 'Natural Granite',  detail: '6–8 seats',   image: '/catalogue/p3_1.png',  span: 'wide' },
  { id: 11, category: 'Dining',  material: 'Sintered Stone',   detail: '4–6 seats',   image: '/catalogue/p16_1.png' },
  { id: 12, category: 'Dining',  material: 'Natural Stone',    detail: '8–10 seats',  image: '/catalogue/p18_1.png' },

  // ── Office ──────────────────────────────────────────────
  { id: 27, category: 'Office', material: 'Sintered Stone',   detail: 'Executive Desk', image: '/office/p1_1.png',   span: 'wide' },
  { id: 28, category: 'Office', material: 'Carrara Marble',   detail: 'Director Desk',  image: '/office/p2_1.png'  },
  { id: 29, category: 'Office', material: 'Natural Slate',    detail: 'Studio Desk',    image: '/office/p3_1.png'  },
  { id: 30, category: 'Office', material: 'White Sintered',   detail: 'Executive Desk', image: '/office/p4_1.png',   span: 'wide' },
  { id: 31, category: 'Office', material: 'Onyx Stone',       detail: 'Work Desk',      image: '/office/p5_1.png'  },
  { id: 32, category: 'Office', material: 'Verde Marble',     detail: 'Writing Desk',   image: '/office/p6_1.png'  },
  { id: 33, category: 'Office', material: 'Travertine',       detail: 'Executive Desk', image: '/office/p7_1.png',   span: 'wide' },
  { id: 34, category: 'Office', material: 'Calacatta Gold',   detail: 'Director Desk',  image: '/office/p8_1.png'  },
  { id: 35, category: 'Office', material: 'Black Granite',    detail: 'Writing Desk',   image: '/office/p9_1.png'  },
  { id: 36, category: 'Office', material: 'Natural Stone',    detail: 'Bureau Desk',    image: '/office/p10_1.png',  span: 'wide' },
  { id: 37, category: 'Office', material: 'Sintered Stone',   detail: 'Studio Desk',    image: '/office/p11_1.png' },
  { id: 38, category: 'Office', material: 'Statuario Marble', detail: 'Executive Desk', image: '/office/p12_1.png' },
  { id: 39, category: 'Office', material: 'Natural Marble',   detail: 'Director Desk',  image: '/office/p13_1.png',  span: 'wide' },
  { id: 40, category: 'Office', material: 'Premium Stone',    detail: 'Executive Desk', image: '/office/p14_1.png' },
  { id: 41, category: 'Office', material: 'Pietra Grey',      detail: 'Work Desk',      image: '/office/p15_1.png' },
  { id: 42, category: 'Office', material: 'Calacatta Marble', detail: 'Bureau Desk',    image: '/office/p16_1.png',  span: 'wide' },
  { id: 43, category: 'Office', material: 'Carrara White',    detail: 'Studio Desk',    image: '/office/p17_1.png' },
  { id: 44, category: 'Office', material: 'Basalt Stone',     detail: 'Executive Desk', image: '/office/p18_1.png' },
  { id: 45, category: 'Office', material: 'Veined Marble',    detail: 'Director Desk',  image: '/office/p19_1.png',  span: 'wide' },
  { id: 46, category: 'Office', material: 'Nero Marquina',    detail: 'Writing Desk',   image: '/office/p20_1.png' },
  { id: 47, category: 'Office', material: 'Ivory Marble',     detail: 'Bureau Desk',    image: '/office/p21_1.png' },
  { id: 48, category: 'Office', material: 'Petra Stone',      detail: 'Executive Desk', image: '/office/p22_1.png',  span: 'wide' },
  { id: 49, category: 'Office', material: 'Obsidian Stone',   detail: 'Studio Desk',    image: '/office/p23_1.png' },
  { id: 50, category: 'Office', material: 'White Marble',     detail: 'Work Desk',      image: '/office/p24_1.png' },
  { id: 51, category: 'Office', material: 'Premium Marble',   detail: 'Executive Desk', image: '/office/p25_1.png',  span: 'wide' },
  { id: 52, category: 'Office', material: 'Graphite Stone',   detail: 'Writing Desk',   image: '/office/p26_1.png' },
  { id: 53, category: 'Office', material: 'Italian Marble',   detail: 'Studio Desk',    image: '/office/p27_1.png' },

  // ── Beds ─────────────────────────────────────────────────
  { id: 73, category: 'Beds', material: 'Upholstered',        detail: 'King',       image: '/beds/p1_1.png',   span: 'wide' },
  { id: 74, category: 'Beds', material: 'Linen Fabric',       detail: 'Queen',      image: '/beds/p2_1.png'  },
  { id: 75, category: 'Beds', material: 'Italian Leather',    detail: 'King',       image: '/beds/p3_1.png'  },
  { id: 76, category: 'Beds', material: 'Bouclé Fabric',      detail: 'Queen',      image: '/beds/p4_1.png',   span: 'wide' },
  { id: 77, category: 'Beds', material: 'Velvet',             detail: 'King',       image: '/beds/p5_1.png'  },
  { id: 78, category: 'Beds', material: 'Full-Grain Leather', detail: 'Super King', image: '/beds/p6_1.png'  },
  { id: 79, category: 'Beds', material: 'Upholstered',        detail: 'King',       image: '/beds/p7_1.png',   span: 'wide' },
  { id: 80, category: 'Beds', material: 'Premium Fabric',     detail: 'Queen',      image: '/beds/p8_1.png'  },
  { id: 81, category: 'Beds', material: 'Italian Leather',    detail: 'King',       image: '/beds/p9_1.png'  },
  { id: 82, category: 'Beds', material: 'Linen Fabric',       detail: 'Super King', image: '/beds/p10_1.png',  span: 'wide' },
  { id: 83, category: 'Beds', material: 'Bouclé Fabric',      detail: 'King',       image: '/beds/p11_1.png' },
  { id: 84, category: 'Beds', material: 'Velvet',             detail: 'Queen',      image: '/beds/p12_1.png' },
  { id: 85, category: 'Beds', material: 'Upholstered',        detail: 'King',       image: '/beds/p13_1.png',  span: 'wide' },
  { id: 86, category: 'Beds', material: 'Full-Grain Leather', detail: 'King',       image: '/beds/p14_1.png' },
  { id: 87, category: 'Beds', material: 'Premium Fabric',     detail: 'Super King', image: '/beds/p15_1.png' },
  { id: 88, category: 'Beds', material: 'Italian Leather',    detail: 'Queen',      image: '/beds/p16_1.png',  span: 'wide' },
  { id: 89, category: 'Beds', material: 'Linen Fabric',       detail: 'King',       image: '/beds/p17_1.png' },
  { id: 90, category: 'Beds', material: 'Bouclé Fabric',      detail: 'King',       image: '/beds/p18_1.png' },
  { id: 91, category: 'Beds', material: 'Velvet',             detail: 'Super King', image: '/beds/p19_1.png',  span: 'wide' },
  { id: 92, category: 'Beds', material: 'Upholstered',        detail: 'Queen',      image: '/beds/p20_1.png' },

  // ── Consoles ─────────────────────────────────────────────
  { id: 54, category: 'Consoles', material: 'Nero Marquina',    detail: 'Console Table', image: '/consoles/p1_1.png',   span: 'wide' },
  { id: 55, category: 'Consoles', material: 'Carrara Marble',   detail: 'Slim Console',  image: '/consoles/p2_1.png'  },
  { id: 56, category: 'Consoles', material: 'Verde Imperiale',  detail: 'Entry Console', image: '/consoles/p3_1.png'  },
  { id: 57, category: 'Consoles', material: 'Onyx Stone',       detail: 'Console Table', image: '/consoles/p4_1.png',   span: 'wide' },
  { id: 58, category: 'Consoles', material: 'White Sintered',   detail: 'Entry Console', image: '/consoles/p5_1.png'  },
  { id: 59, category: 'Consoles', material: 'Travertine',       detail: 'Hall Console',  image: '/consoles/p6_1.png'  },
  { id: 60, category: 'Consoles', material: 'Statuario Marble', detail: 'Console Table', image: '/consoles/p7_1.png',   span: 'wide' },
  { id: 61, category: 'Consoles', material: 'Natural Slate',    detail: 'Slim Console',  image: '/consoles/p8_1.png'  },
  { id: 62, category: 'Consoles', material: 'Calacatta Gold',   detail: 'Entry Console', image: '/consoles/p9_1.png'  },
  { id: 63, category: 'Consoles', material: 'Pietra Grey',      detail: 'Console Table', image: '/consoles/p10_1.png',  span: 'wide' },
  { id: 64, category: 'Consoles', material: 'Premium Marble',   detail: 'Hall Console',  image: '/consoles/p11_1.png' },
  { id: 65, category: 'Consoles', material: 'Basalt Stone',     detail: 'Entry Console', image: '/consoles/p12_1.png' },
  { id: 66, category: 'Consoles', material: 'Black Granite',    detail: 'Slim Console',  image: '/consoles/p13_1.png',  span: 'wide' },
  { id: 67, category: 'Consoles', material: 'Ivory Marble',     detail: 'Console Table', image: '/consoles/p14_1.png' },
  { id: 68, category: 'Consoles', material: 'Natural Stone',    detail: 'Entry Console', image: '/consoles/p15_1.png' },
  { id: 69, category: 'Consoles', material: 'Calacatta Marble', detail: 'Hall Console',  image: '/consoles/p16_1.png',  span: 'wide' },
  { id: 70, category: 'Consoles', material: 'Graphite Stone',   detail: 'Slim Console',  image: '/consoles/p17_1.png' },
  { id: 71, category: 'Consoles', material: 'Veined Marble',    detail: 'Console Table', image: '/consoles/p18_1.png' },
  { id: 72, category: 'Consoles', material: 'Italian Marble',   detail: 'Entry Console', image: '/consoles/p19_1.png',  span: 'wide' },

  // ── Sofas ────────────────────────────────────────────────
  { id: 13, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Sectional', image: '/sofas/p1_1.png',   span: 'wide' },
  { id: 14, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Armchair',  image: '/sofas/p19_1.png'  },
  { id: 15, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Sectional', image: '/sofas/p5_1.png'   },
  { id: 16, category: 'Sofas', material: 'Italian Leather',    detail: 'Sectional', image: '/sofas/p8_1.png',   span: 'wide' },
  { id: 17, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Armchair',  image: '/sofas/p30_1.png'  },
  { id: 18, category: 'Sofas', material: 'Italian Leather',    detail: 'Sectional', image: '/sofas/p12_1.png'  },
  { id: 19, category: 'Sofas', material: 'Premium Leather',    detail: 'Sofa',      image: '/sofas/p35_1.png'  },
  { id: 20, category: 'Sofas', material: 'Italian Leather',    detail: 'Armchair',  image: '/sofas/p39_1.png'  },
  { id: 21, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Sectional', image: '/sofas/p41_1.png',  span: 'wide' },
  { id: 22, category: 'Sofas', material: 'Bouclé Fabric',      detail: 'Armchair',  image: '/sofas/p48_1.png'  },
  { id: 23, category: 'Sofas', material: 'Italian Leather',    detail: 'Sofa',      image: '/sofas/p25_1.png'  },
  { id: 24, category: 'Sofas', material: 'Premium Leather',    detail: 'Suite',     image: '/sofas/p54_1.png',  span: 'wide' },
  { id: 25, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Armchair',  image: '/sofas/p57_1.png'  },
  { id: 26, category: 'Sofas', material: 'Full-Grain Leather', detail: 'Sofa',      image: '/sofas/p61_1.png'  },
];

const COUNTS: Record<Category, number> = {
  All:      products.length,
  Sofas:    products.filter(p => p.category === 'Sofas').length,
  Beds:     products.filter(p => p.category === 'Beds').length,
  Office:   products.filter(p => p.category === 'Office').length,
  Consoles: products.filter(p => p.category === 'Consoles').length,
  Dining:   products.filter(p => p.category === 'Dining').length,
};

interface Props {
  hideHeader?: boolean;
}

function categoryFromParam(param: string | null): Category {
  if (param && CATEGORIES.includes(param as Category)) return param as Category;
  return 'All';
}

export default function Collections({ hideHeader = false }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = categoryFromParam(searchParams.get('category'));
  const { open } = useEnquire();

  const handleCategoryChange = (cat: Category) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const filtered = active === 'All' ? products : products.filter(p => p.category === active);

  return (
    <section id="collections" className="collections">
      <div className="container">

        {!hideHeader && (
          <div className="collections__standalone-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow">The Collection</span>
              <h2 className="collections__title">
                Every piece, a <em>considered</em> object.
              </h2>
            </motion.div>
          </div>
        )}

        {/* Sticky filter bar */}
        <div className="collections__filter-bar">
          <div className="collections__filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`collections__filter${active === cat ? ' collections__filter--active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
                <span className="collections__filter-count">{COUNTS[cat]}</span>
              </button>
            ))}
          </div>
          <span className="collections__results-count">
            {filtered.length} {filtered.length === 1 ? 'object' : 'objects'}
          </span>
        </div>

        <motion.div className="collections__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.article
                key={product.id}
                className={`product-card${product.span === 'wide' ? ' product-card--wide' : ''}`}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="product-card__image-wrap">
                  <span className="product-card__num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={product.image}
                    alt={product.material}
                    className="product-card__image"
                    loading="lazy"
                  />
                </div>

                <div className="product-card__info">
                  <div className="product-card__details">
                    <h3 className="product-card__material-name">{product.material}</h3>
                    <span className="product-card__detail">{product.detail}</span>
                  </div>
                  <button
                    className="product-card__enquire-btn"
                    onClick={() => open(`${product.material} — ${product.detail}`)}
                  >
                    Enquire
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
