import { Route, Routes } from 'react-router-dom';
import Header from './components/HeaderApp';

import PainelProcessos from './pages/painelProcessos';
import PainelEsterilizacoes from './pages/painelEsterilizacoes';
import Configuracoes from './pages/configuracoes';
import ResumoOrdensSemanas from './pages/resumoOrdensSemanas';
import ProcessMap from './pages/ProcessMap';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import Footer from './components/FooterApp';
import { OrderSummary } from './pages/OrderSummary';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<PainelProcessos />} />
        <Route path="/esterilizacoes" element={<PainelEsterilizacoes />} />
        <Route path="/resume-orders" element={<ResumoOrdensSemanas />} />
        <Route
          path="/configuration"
          element={
            <RequireAuth>
              <Configuracoes />
            </RequireAuth>
          }
        />
        <Route
          path="/layouts"
          element={
            <RequireAuth>
              <Configuracoes />
            </RequireAuth>
          }
        />
        <Route path="/process-map" element={<ProcessMap />} />
        <Route path="/order-summary-by-week" element={<OrderSummary />} />
      </Routes>

      <Footer />
    </div>
  );
};
