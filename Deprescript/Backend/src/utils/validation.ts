import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  userType: z.enum(['PATIENT', 'PHYSICIAN']),
});

export const signUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  fullName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  userType: z.enum(['PATIENT', 'PHYSICIAN']),
  crm: z.string().optional(),
  specialty: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
  verificationCode: z.string().min(4, 'Código inválido'),
  newPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  userType: z.enum(['PATIENT', 'PHYSICIAN']),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

