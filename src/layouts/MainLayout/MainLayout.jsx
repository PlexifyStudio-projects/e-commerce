import Header from '@components/Header';
import Footer from '@components/Footer';
import Panels from '@components/Panels';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>{children}</main>
      <Footer />
      <Panels />
    </div>
  );
};

export default MainLayout;
