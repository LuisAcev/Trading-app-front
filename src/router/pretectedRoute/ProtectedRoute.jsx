import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../../theme/Dashboard";

export const ProtectedRoute = () => {
  const { isLoading } = useSelector((item) => item.userSlice);
  return isLoading ? <Dashboard /> : <Navigate to={"/"} />;
};
