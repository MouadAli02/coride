import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme/theme-provider';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import RidesPage from '@/pages/rides/RidesPage';
import OfferRidePage from '@/pages/rides/OfferRidePage';
import FindRidePage from '@/pages/rides/FindRidePage';
import ProfilePage from '@/pages/ProfilePage';
import MessagingPage from '@/pages/MessagingPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AuthProvider from '@/providers/AuthProvider';
import { NotificationsProvider } from '@/providers/NotificationsProvider';
import Chatbot from './pages/AI/Chatbot';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="coride-theme">
      <AuthProvider>
        <NotificationsProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/rides" element={<RidesPage />} />
                  <Route path="/rides/offer" element={<OfferRidePage />} />
                  <Route path="/rides/find" element={<FindRidePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/messages" element={<MessagingPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/chatbot" element={<Chatbot />} />
  

                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster position="top-right" />
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;