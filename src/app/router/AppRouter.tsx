import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../features/auth/ui/hooks/useAuth";
import { LoginPage } from "../../features/auth/ui/LoginPage";
import { RegisterPage } from "../../features/auth/ui/RegisterPage";
import { DashboardPage } from "../../features/dashboard/ui/DashboardPage";
import { DevicesPage } from "../../features/devices/ui/DevicesPage";
import { HistoryPage } from "../../features/medic-status/ui/HistoryPage";
import { ProfilePage } from "../../features/profile/ui/ProfilePage";
import { ProtectedRoute } from "./ProtectedRoute";

function LoginRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <LoginPage />;
}

function RegisterRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <RegisterPage />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <DevicesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
