import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../../theme/Dashboard";

//production
// export const ProtectedRoute = () => {
//   const { isLoading } = useSelector((item) => item.userSlice);
//   return isLoading ? <Dashboard /> : <Navigate to={"/"} />;
// };

export const ProtectedRoute = () => {

  return  <Dashboard />;
};

