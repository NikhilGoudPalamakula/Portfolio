import { ConfigProvider, theme as antdAlgorithms } from 'antd';
import useAppStore from '@/store/appStore';
import { antdTokens } from './theme';

// antd only shows up on the login / admin scaffold, but it should still
// follow the site's light/dark choice.
const AntdThemeProvider = ({ children }) => {
  const mode = useAppStore((s) => s.theme);

  return (
    <ConfigProvider
      theme={{
        ...antdTokens(mode),
        algorithm:
          mode === 'dark' ? antdAlgorithms.darkAlgorithm : antdAlgorithms.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdThemeProvider;
