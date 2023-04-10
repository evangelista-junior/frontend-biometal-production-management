import { Route, Routes } from 'react-router-dom';
import Header from './components/HeaderApp';
import ProcessMap from './pages/ProcessMap';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import Footer from './components/FooterApp';
import { OrderSummary } from './pages/OrderSummary';
import { VisualizationLayouts } from './pages/VisualizationLayouts';
import { TimeSettings } from './pages/TimeSettings/index';
import { UserSettings } from './pages/UserSettings';

export const App = () => {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/" element={<ProcessMap />} />
                <Route path="/process-map" element={<ProcessMap />} />
                <Route path="/order-summary-by-week" element={<OrderSummary />} />
                <Route
                    path="/time-settings"
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
                <Route
                    path="/user-settings"
                    element={
                        <RequireAuth>
                            <UserSettings />
                        </RequireAuth>
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
};
