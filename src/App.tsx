import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"

const { Content } = Layout;

export default function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "0px" }}>
          <Routes>
            {/* Route pour la page d'accueil (optionnelle) */}
            <Route path="/" element={<Home />} />

            {/* Route pour le login */}
            <Route path="/login" element={<Login />} />

            {/* Route pour le dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Redirection par défaut (si aucune route ne correspond) */}
            <Route path="*" element={<div>Page non trouvée</div>} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}