import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;