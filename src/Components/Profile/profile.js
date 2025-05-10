import React from 'react';

const Profile = ({ userProfile }) => {
  return (
    <div className="container">
      <h2 className="text-light font-mont">Your Profile</h2>
      <div className="profile">
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
      </div>
    </div>
  );
};

export default Profile;
