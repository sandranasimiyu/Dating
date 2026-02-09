import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './database.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const profilePicture = profile.photos[0]?.value;

        // Check if user exists with this Google ID
        let result = await pool.query(
          'SELECT * FROM users WHERE google_id = $1',
          [googleId]
        );

        let user;

        if (result.rows.length > 0) {
          // User exists, update last login
          user = result.rows[0];
          await pool.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
          );
        } else {
          // Check if user exists with this email (from regular registration)
          result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
          );

          if (result.rows.length > 0) {
            // Link Google account to existing user
            user = result.rows[0];
            await pool.query(
              `UPDATE users 
               SET google_id = $1, 
                   auth_provider = 'google', 
                   profile_picture = $2,
                   last_login = CURRENT_TIMESTAMP 
               WHERE id = $3`,
              [googleId, profilePicture, user.id]
            );
          } else {
            // Create new user
            const username = email.split('@')[0] + '_' + Math.random().toString(36).substring(7);
            
            result = await pool.query(
              `INSERT INTO users (first_name, last_name, username, email, google_id, auth_provider, profile_picture) 
               VALUES ($1, $2, $3, $4, $5, 'google', $6) 
               RETURNING *`,
              [firstName, lastName, username, email, googleId, profilePicture]
            );
            user = result.rows[0];
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
