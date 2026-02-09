import pool from './database.js';

const initDatabase = async () => {
  try {
    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        auth_provider VARCHAR(50) DEFAULT 'local',
        google_id VARCHAR(255) UNIQUE,
        profile_picture VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      );
    `);
    console.log('✓ Users table ready');

    // Create indexes if they don't exist
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
    console.log('✓ Email index ready');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);
    console.log('✓ Username index ready');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
    `);
    console.log('✓ Google ID index ready');

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

export default initDatabase;
