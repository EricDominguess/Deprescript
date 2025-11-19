import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/encryption';
import { loginSchema, signUpSchema, forgotPasswordSchema } from '../utils/validation';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, userType } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        patient: true,
        physician: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    if (user.userType !== userType) {
      res.status(401).json({ error: 'Tipo de usuário incorreto' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        profile: user.patient || user.physician,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao fazer login', details: error });
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = signUpSchema.parse(req.body);
    const { email, password, fullName, userType, crm, specialty } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email já cadastrado' });
      return;
    }

    if (userType === 'PHYSICIAN' && !crm) {
      res.status(400).json({ error: 'CRM é obrigatório para médicos' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType,
        ...(userType === 'PATIENT'
          ? {
              patient: {
                create: {
                  fullName,
                },
              },
            }
          : {
              physician: {
                create: {
                  fullName,
                  crm: crm!,
                  specialty: specialty || null,
                },
              },
            }),
      },
      include: {
        patient: true,
        physician: true,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        profile: user.patient || user.physician,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar', details: error });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, verificationCode, newPassword, userType } = forgotPasswordSchema.parse(req.body);

    // TODO: Implementar verificação de código (envio por email)
    // Por enquanto, apenas validamos o código como "1234" para desenvolvimento
    if (verificationCode !== '1234') {
      res.status(400).json({ error: 'Código de verificação inválido' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.userType !== userType) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao redefinir senha', details: error });
  }
};

