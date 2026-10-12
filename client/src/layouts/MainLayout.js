import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import NextHint from '@/components/NextHint';
import styles from './MainLayout.module.scss';

/*
 * Fixed-viewport shell: the nav and drawer never scroll — only `.view` does.
 * Each route change resets that scroller and re-keys `.inner` so the page
 * fades in again.
 */
const MainLayout = () => {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pathname]);

  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.view} ref={scrollRef}>
        <div className={styles.inner} key={pathname}>
          <Outlet />
          <Footer />
        </div>
      </div>
      <NextHint scrollRef={scrollRef} />
    </div>
  );
};

export default MainLayout;
