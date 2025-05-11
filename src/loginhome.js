import React from "react";
import { useAuth } from "./contexts/auth";
import SignOutButton from "./signout";

const LoginHome = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="blue">
      {currentUser && (
        <div className="btn">
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default LoginHome;
