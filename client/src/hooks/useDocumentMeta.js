import { useEffect } from 'react';

const setMeta = (attr, key, val) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', val);
};

// Per-page title plus the description / Open Graph tags crawlers read.
const useDocumentMeta = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta('property', 'og:title', title);
    }
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [title, description]);
};

export default useDocumentMeta;
