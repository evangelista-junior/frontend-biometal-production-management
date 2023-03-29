import { Route, Routes } from 'react-router-dom';
import Header from './components/HeaderApp';

// import PainelProcessos from './pages/painelProcessos'; <-- deprecated
// import PainelEsterilizacoes from './pages/painelEsterilizacoes'; <-- deprecated
// import Configuracoes from './pages/configuracoes'; <-- deprecated
// import ResumoOrdensSemanas from './pages/resumoOrdensSemanas'; <-- deprecated
import ProcessMap from './pages/ProcessMap';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import Footer from './components/FooterApp';
import { OrderSummary } from './pages/OrderSummary';
import { VisualizationLayouts } from './pages/VisualizationLayouts';
import { TimeSettings } from './pages/TimeSettings/indext';

export const App = () => {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/" element={<ProcessMap />} />
                <Route path="/process-map" element={<ProcessMap />} />
                <Route path="/order-summary-by-week" element={<OrderSummary />} />
                <Route
                    path="/work-settings"
                    element={
                        <RequireAuth>
                            <TimeSettings />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/layouts"
                    element={
                        <RequireAuth>
                            <VisualizationLayouts />
                        </RequireAuth>
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
};
