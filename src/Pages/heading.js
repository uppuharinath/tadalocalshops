import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const Heading = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  return (
    <div className="container white">
      <div className="row jcc aic box-shadow1">
        <div className="col-9-ld">
          <h1 className="listings text-center">What's Special about this portal !!!</h1>
          <ul>
            <li>This portal is for Services available in TADA only like List of Shops/Professional services.</li>
            <li>Direct owner contact through WhatsApp.</li>
            <li>Owners of the shops can register for free and offer discount prices here.</li>
            <li>Users can request for service for door delivery if available or you can do pre-order.</li>
          </ul>
        </div>

        <div className="col-3-ld text-center">
          <div className="text-light text-md">Account info</div>

          {!isLoading && !currentUser ? (
            <>
              <button className="btn" onClick={() => navigate('/register')}>Signup</button>
              <button className="btn" onClick={() => navigate('/login')}>Login</button>
            </>
          ) : !isLoading && currentUser ? (
            <div className="text-success">
              Welcome: {currentUser.displayName || currentUser.email}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Heading;
