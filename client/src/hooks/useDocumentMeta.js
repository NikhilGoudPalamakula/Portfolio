import { useEffect } from 'react';
import { PROFILE } from '@/content';

const setMeta = (attr, key, val) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', val);
};

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
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

    // Always the production URL, so preview deploys don't self-canonicalise.
    const url = `${PROFILE.site}${window.location.pathname}`;
    setMeta('property', 'og:url', url);
    setLink('canonical', url);
  }, [title, description]);
};

export default useDocumentMeta;
