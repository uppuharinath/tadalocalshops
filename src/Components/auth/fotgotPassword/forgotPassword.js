import { Link, useLocation } from "react-router-dom";

const ForgotPasswordLink = () => {
  const location = useLocation();
  return (
    <div className="forgot-password">
      <Link 
        to="/forgot-password"
        state={{ from: location.state?.from }}
        className="text-link"
      >
        Forgot password?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink