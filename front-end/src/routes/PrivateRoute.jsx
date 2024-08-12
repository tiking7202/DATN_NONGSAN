import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
export const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('accessToken');
    return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export const FarmerPrivateRoute = () => {
  const farmerToken = localStorage.getItem('farmerToken');
  return farmerToken ? <Component /> : <Navigate to="/farmer/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
