import pool from '../config/database.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        first_name, 
        last_name, 
        username, 
        email, 
        auth_provider, 
        google_id,
        profile_picture,
        created_at, 
        last_login,
        is_active
      FROM users 
      ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching users'
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT 
        id, 
        first_name, 
        last_name, 
        username, 
        email, 
        auth_provider, 
        google_id,
        profile_picture,
        created_at, 
        last_login,
        is_active
      FROM users 
      WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user'
    });
  }
};
