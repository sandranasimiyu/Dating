import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/signing");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Kindlee</h1>
        </div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard">Browse</Link>
          <Link to="/dashboard">Matches</Link>
          <Link to="/dashboard">Messages</Link>
          <Link to="/dashboard">Profile</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, {user.firstName}! 👋</h2>
          <p>Ready to find your perfect match?</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Complete Your Profile</h3>
            <p>Add photos and details to attract more matches</p>
            <button className="card-btn">Edit Profile</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🔍</div>
            <h3>Browse Profiles</h3>
            <p>Discover people who match your interests</p>
            <button className="card-btn">Start Browsing</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💬</div>
            <h3>Messages</h3>
            <p>You have 0 new messages</p>
            <button className="card-btn">View Messages</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">❤️</div>
            <h3>Your Matches</h3>
            <p>0 people liked your profile</p>
            <button className="card-btn">View Matches</button>
          </div>
        </div>

        <div className="user-info-section">
          <h3>Your Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.firstName} {user.lastName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">@{user.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
