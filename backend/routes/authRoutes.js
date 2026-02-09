import express from 'express';
import passport from '../config/passport.js';
import { register, login, getProfile, googleCallback } from '../controllers/authController.js';
import { validateRegistration, validateLogin, handleValidationErrors } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegistration, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/profile', authenticateToken, getProfile);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: '/signing?error=authentication_failed'
  }),
  googleCallback
);

export default router;
