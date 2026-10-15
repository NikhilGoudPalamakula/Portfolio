// One entry per employer, newest first. These head the groups on the Work page;
// a project joins a group when its `org` matches `org` here exactly.
export const CAREER = [
  {
    org: 'PatternLab.ai',
    location: 'Hyderabad, India',
    roles: [{ role: 'Full-Stack Developer', year: 'May 2024 – Present' }],
    note: 'Building multi-tenant B2B SaaS platforms for manufacturing, energy and export businesses on React, TypeScript, NestJS and MongoDB.',
  },
  {
    org: 'Matrical Technologies',
    short: 'Matrical', // career-bar label; its block is too narrow for the full name
    location: 'Bengaluru, India',
    roles: [{ role: 'Full-Stack Developer', year: 'Jun 2023 – May 2024' }],
    note: 'Worked directly with clients — turning requirements into technical specs and shipping against them, demoing the platform, and supporting pre-sales pitches that brought in new business.',
  },
  {
    org: 'SR Automation',
    location: 'Hyderabad, India',
    roles: [{ role: 'Factory Automation Engineer', year: 'Nov 2020 – Jun 2023' }],
    note: 'Programmed and commissioned PLC systems (Mitsubishi, Allen-Bradley) and designed SCADA interfaces backed by SQL — alongside techno-commercial work: client negotiations, new orders, and quotation-to-closing on projects including a Mahindra & Mahindra migration.',
  },
];
