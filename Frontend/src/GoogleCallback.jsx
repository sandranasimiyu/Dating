import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      alert('Google authentication failed. Please try again.');
      navigate('/signing');
      return;
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('Error parsing user data:', err);
        alert('Authentication error. Please try again.');
        navigate('/signing');
      }
    } else {
      navigate('/signing');
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      <p>Completing Google sign-in...</p>
    </div>
  );
};

export default GoogleCallback;
