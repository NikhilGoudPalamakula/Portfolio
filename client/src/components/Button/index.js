import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

/*
 * One button surface for the whole site.
 *   variant  'solid' | 'ghost'
 *   to       renders a router <Link>
 *   href     renders an <a> (external links get target/rel automatically)
 *   neither  renders a <button>
 */
const Button = ({
  variant = 'ghost',
  to,
  href,
  external,
  children,
  className = '',
  ...rest
}) => {
  const cls = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;
