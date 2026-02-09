import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import initDatabase from './config/initDatabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/view-users', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Database Users</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        button {
            background: #4285f4;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        button:hover {
            background: #357ae8;
        }
        #users-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .user-card {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 6px;
            background: #fafafa;
        }
        .user-card h3 {
            margin-top: 0;
            color: #4285f4;
        }
        .user-info {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 10px;
            margin: 5px 0;
        }
        .label {
            font-weight: bold;
            color: #666;
        }
        .value {
            color: #333;
        }
        .google-user {
            border-left: 4px solid #4285f4;
        }
        .local-user {
            border-left: 4px solid #34a853;
        }
        img.profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .error {
            color: red;
            padding: 10px;
            background: #ffebee;
            border-radius: 4px;
        }
        .count {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>📊 Database Users Viewer</h1>
    <button onclick="loadUsers()">🔄 Refresh Users</button>
    <div id="users-container">
        <p>Loading users...</p>
    </div>

    <script>
        async function loadUsers() {
            const container = document.getElementById('users-container');
            container.innerHTML = '<p>Loading users...</p>';

            try {
                const response = await fetch('/api/admin/users');
                const data = await response.json();

                if (data.success) {
                    const users = data.data;
                    
                    if (users.length === 0) {
                        container.innerHTML = '<p>No users found in the database.</p>';
                        return;
                    }

                    let html = \`<div class="count">Total Users: \${data.count}</div>\`;
                    
                    users.forEach(user => {
                        const isGoogle = user.auth_provider === 'google';
                        const cardClass = isGoogle ? 'google-user' : 'local-user';
                        
                        html += \`
                            <div class="user-card \${cardClass}">
                                <h3>
                                    \${user.profile_picture ? \`<img src="\${user.profile_picture}" class="profile-pic" alt="Profile">\` : ''}
                                    \${user.first_name} \${user.last_name}
                                </h3>
                                <div class="user-info">
                                    <span class="label">ID:</span>
                                    <span class="value">\${user.id}</span>
                                    
                                    <span class="label">Username:</span>
                                    <span class="value">\${user.username}</span>
                                    
                                    <span class="label">Email:</span>
                                    <span class="value">\${user.email}</span>
                                    
                                    <span class="label">Auth Provider:</span>
                                    <span class="value">\${user.auth_provider} \${isGoogle ? '🔵' : '🟢'}</span>
                                    
                                    \${user.google_id ? \`
                                        <span class="label">Google ID:</span>
                                        <span class="value">\${user.google_id}</span>
                                    \` : ''}
                                    
                                    <span class="label">Created:</span>
                                    <span class="value">\${new Date(user.created_at).toLocaleString()}</span>
                                    
                                    <span class="label">Last Login:</span>
                                    <span class="value">\${user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</span>
                                    
                                    <span class="label">Active:</span>
                                    <span class="value">\${user.is_active ? '✅ Yes' : '❌ No'}</span>
                                </div>
                            </div>
                        \`;
                    });
                    
                    container.innerHTML = html;
                } else {
                    container.innerHTML = \`<div class="error">Error: \${data.message}</div>\`;
                }
            } catch (error) {
                container.innerHTML = \`<div class="error">Error: \${error.message}</div>\`;
            }
        }

        window.onload = loadUsers;
    </script>
</body>
</html>
  `);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(` CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error(' Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
