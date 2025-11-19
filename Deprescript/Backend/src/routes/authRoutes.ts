import { Router } from 'express';
import { login, signUp, forgotPassword } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);

export default router;

