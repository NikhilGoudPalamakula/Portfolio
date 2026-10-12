// Extra search terms for skills whose project copy uses a different name.
// Matching is otherwise the skill's own label, whole-word, case-sensitive.
export const SKILL_TERMS = {
  'Material UI': ['Material UI', 'MUI'],
  'PLC logic': ['PLC'],
};

export const SKILLS = [
  {
    group: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Vite',
      'Material UI',
      'Ant Design',
      'Highcharts',
      'CSS',
      'SCSS',
    ],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'NestJS', 'Express', 'Socket.IO', 'Python', 'MongoDB', 'SQL', 'Redis'],
  },
  {
    group: 'DevOps & Tools',
    items: ['Docker', 'AWS', 'Git · CI/CD', 'GitLab'],
  },
  {
    group: 'Industrial',
    items: ['PLC logic', 'Mitsubishi', 'Allen-Bradley', 'SCADA', 'Beijer HMI', '21 CFR Part 11'],
  },
];
