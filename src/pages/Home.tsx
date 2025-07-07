import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenue sur REGIDESO DocTracker</h1>
      <Button onClick={() => navigate("/login")}>Se connecter</Button>
      <Button onClick={() => navigate("/dashboard")}>Accéder au dashboard</Button>
    </div>
  );
}