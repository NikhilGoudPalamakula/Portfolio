export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work', num: '01' },
  { to: '/about', label: 'About', num: '02' },
  { to: '/skills', label: 'Skills', num: '03' },
  { to: '/path', label: 'Path', num: '04' },
  { to: '/contact', label: 'Contact', num: '05' },
];

// The section after `pathname` in nav order, or null at the end of the ladder.
// Unknown paths (a project detail page, /login) return null.
export const getNextSection = (pathname) => {
  const i = NAV.findIndex((n) => n.to === pathname);
  if (i === -1) return null;
  return NAV[i + 1] ?? null;
};
