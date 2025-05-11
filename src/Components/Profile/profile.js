import React from 'react';
import { useAuth } from '../../contexts/auth';

const Profile = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-error">
        <h3>Not Authenticated</h3>
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
        {currentUser.photoURL && (
          <img 
            src={currentUser.photoURL} 
            alt="Profile" 
            className="profile-picture"
          />
        )}
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Name:</span>
          <span className="detail-value">
            {currentUser.displayName || 'Not provided'}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">
            {currentUser.email || 'Not provided'}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email Verified:</span>
          <span className="detail-value">
            {currentUser.emailVerified ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Account Created:</span>
          <span className="detail-value">
            {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Last Login:</span>
          <span className="detail-value">
            {new Date(currentUser.metadata.lastSignInTime).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="edit-profile-btn">
          Edit Profile
        </button>
        <button className="change-password-btn">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;