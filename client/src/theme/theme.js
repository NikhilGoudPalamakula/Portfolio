/*
 * Editorial palette, mirrored from styles/global.scss so JS-side consumers
 * (antd's ConfigProvider) match the CSS custom properties exactly.
 */
export const colors = {
  light: {
    paper: '#f4f1ea',
    ink: '#1a1a17',
    muted: '#6e6a60',
    line: '#dad5c8',
    surface: '#ede9e0',
    surface2: '#e7e2d8',
    pine: '#1e3a2f',
    indigo: '#3d3ae0',
    clay: '#b4623c',
    accent: '#b4623c',
  },
  dark: {
    paper: '#141310',
    ink: '#efebe1',
    muted: '#948e82',
    line: '#2e2b24',
    surface: '#1c1a15',
    surface2: '#211e18',
    pine: '#6fa88c',
    indigo: '#8280f5',
    clay: '#d2825a',
    accent: '#d2825a',
  },
};

const FONT_FAMILY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// antd tokens for one mode.
export const antdTokens = (mode = 'light') => {
  const c = colors[mode];

  return {
    token: {
      colorPrimary: c.accent,
      colorError: '#e5484d',
      colorSuccess: '#30a46c',
      colorWarning: '#f0b429',
      colorBgBase: c.paper,
      colorBgContainer: c.surface,
      colorBgElevated: c.surface2,
      colorBorder: c.line,
      colorText: c.ink,
      colorTextSecondary: c.muted,
      fontFamily: FONT_FAMILY,
      borderRadius: 2,
      controlHeight: 40,
    },
    components: {
      Button: { fontWeight: 500, primaryShadow: 'none' },
      Input: { activeShadow: 'none' },
    },
  };
};
