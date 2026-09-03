export const PROFILE = {
  name: 'Nikhil Goud Palamakula',
  short: 'Nikhil',
  role: 'Full-Stack Developer',
  tagline:
    'I build fast, reliable web applications — from the database schema to the pixel-perfect UI. I came up through factory-floor engineering, so I build for the real world, not just the browser.',
  location: 'Hyderabad, India',
  email: 'nikhilgoudpalamakula@gmail.com',
  phone: '+91 95500 28076',
  available: true,
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nikhil-goud-palamakula/',
      brand: 'LinkedIn',
    },
  ],
};

/*
 * The PDF must sit at client/public/resume.pdf so Vite serves it verbatim
 * at /resume.pdf. Set `href: null` to hide every download button at once.
 */
export const RESUME = {
  href: '/resume.pdf',
  filename: 'Nikhil-Goud-Palamakula-Resume.pdf',
  label: 'Download resume',
  short: 'CV', // nav slot — no room for the full label
};

export const ABOUT = [
  "I'm a full-stack developer with around three years building production web applications — a hospital management system, energy and factory-intelligence platforms, and a seafood-industry ERP — on a React, Node, and NestJS stack. Before moving into software, I spent nearly three more years as an automation and SCADA engineer across pharma and manufacturing, building systems people genuinely depend on.",
  "That mix means I'm as comfortable with a database schema or an API as I am with a factory floor or a compliance requirement. I lean toward simple, readable code and interfaces that stay out of the way — with the reporting, audit trails, and user management that real-world systems actually need.",
];

export const QUICK_FACTS = [
  { k: 'Focus', v: 'Full-Stack · Web' },
  { k: 'Main stack', v: 'TypeScript · React · Node' },
  { k: 'Experience', v: '5+ yrs engineering · 3+ in software' },
  { k: 'Based in', v: 'Hyderabad, IN' },
  { k: 'Status', v: 'Open to work' },
];

export const SEO_DESCRIPTION =
  'Full-stack developer in Hyderabad building production web applications — ERP, energy and manufacturing-intelligence platforms on React, TypeScript, Node.js and NestJS.';
