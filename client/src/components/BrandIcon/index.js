import { Database, Terminal, GitBranch, CircuitBoard } from 'lucide-react';
import { BRAND_ICONS, BRAND_ALIAS, isDarkBrand } from './brandIcons';
import styles from './BrandIcon.module.scss';

// Names with no brand logo but a sensible line icon.
const LINE_FALLBACK = {
  SQL: Database,
  CLI: Terminal,
  'CI/CD': GitBranch,
  'PLC logic': CircuitBoard,
};

const BrandIcon = ({ name, size = 15 }) => {
  const brand = BRAND_ICONS[BRAND_ALIAS[name] || name];

  if (brand) {
    return (
      <svg
        className={`${styles.icon} ${isDarkBrand(brand.hex) ? styles.darkBrand : ''}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={brand.hex}
        aria-hidden="true"
      >
        {brand.paths ? (
          brand.paths.map((p) => <path key={p.d} d={p.d} fill={p.fill} />)
        ) : (
          <path d={brand.path} />
        )}
      </svg>
    );
  }

  const Fallback = LINE_FALLBACK[name];
  if (!Fallback) return null; // no logo and no fallback — the label stands alone

  return <Fallback className={styles.icon} size={size} aria-hidden="true" />;
};

export default BrandIcon;
