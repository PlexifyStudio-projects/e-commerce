import { HashRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '@context/StoreContext';
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';
import Products from '@pages/Products';
import Ofertas from '@pages/Ofertas';
import Nosotros from '@pages/Nosotros';
import Checkout from '@pages/Checkout';

const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/productos"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/ofertas"
            element={
              <MainLayout>
                <Ofertas />
              </MainLayout>
            }
          />
          <Route
            path="/nosotros"
            element={
              <MainLayout>
                <Nosotros />
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <Checkout />
              </MainLayout>
            }
          />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
