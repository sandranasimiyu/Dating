import React from 'react';
import searchImg from './assets/search.png';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <img 
      src={searchImg} 
      alt="Sign in with Google" 
      onClick={handleGoogleLogin}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default GoogleLoginButton;
