/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isLoading && !user?.email) {
    return <Navigate to='/login' state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;