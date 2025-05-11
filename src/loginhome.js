import React from "react";
import { useAuth } from "./contexts/auth";
import SignOutButton from "./signout";
const LoginHome = () => {
  const { currentUser, isLoading } = useAuth();
  return (
    <div className="blue">
        Welcome{currentUser?.displayName ? `, ${currentUser.displayName}` : currentUser?.email ? `, ${currentUser.email}` : ""}! 
        <button className="btn">
          <SignOutButton />
        </button>
    </div>
  );
};
export default LoginHome;
