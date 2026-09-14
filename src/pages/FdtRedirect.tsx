import { Navigate, useLocation } from "react-router-dom";

/**
 * /white-paper and /whitepaper are convenience URLs that land on /fdt,
 * carrying any ?src= tracking parameter through.
 */
const FdtRedirect = () => {
  const { search } = useLocation();
  return <Navigate to={`/fdt${search}`} replace />;
};

export default FdtRedirect;
