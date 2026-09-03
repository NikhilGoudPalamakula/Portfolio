import { Fragment } from 'react';
import styles from './Bullets.module.scss';

/*
 * Emphasise figures that carry a symbol (%, $, +, ~, –) so real metrics pop
 * without lighting up things like "Part 11" or "Unit 6".
 */
const FIGURE = /(~?\$?\d[\d,.]*\s?(?:%|\+)?(?:\s?–\s?\d[\d,.]*%?)?)/g;

const emphasise = (text) =>
  String(text)
    .split(FIGURE)
    .map((s, i) => {
      if (!s) return null;
      const isMetric = /\d/.test(s) && /[%$+~–]/.test(s);
      return isMetric ? (
        <strong className={styles.figure} key={i}>
          {s}
        </strong>
      ) : (
        <Fragment key={i}>{s}</Fragment>
      );
    });

const Bullets = ({ items }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <li key={item}>{emphasise(item)}</li>
    ))}
  </ul>
);

export default Bullets;
