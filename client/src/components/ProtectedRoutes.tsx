import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  return <Outlet />;
  // it will mount the all children routes
};

export default ProtectedRoutes;
