import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { App as AntdApp, message } from "antd";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import ProtectedLayout from "./components/ProtectedLayout";
import PublicLayout from "./components/PublicLayout";
import SettingsPage from './pages/Settings';
import TeamPage from './pages/Team';

  message.config({
    duration: 3,
    maxCount: 3
  });

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <AntdApp>
          <Routes>
            {/* Routes publiques */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Routes protégées */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/team" element={<TeamPage />} />
            </Route>

            {/* Redirections */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AntdApp>
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;