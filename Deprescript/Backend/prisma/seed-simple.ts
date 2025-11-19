import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  // Desabilitar transações para MongoDB local sem replica set
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar senha hash para os usuários de teste
  const hashedPassword = await bcrypt.hash('123456', 10);

  try {
    // Verificar se os usuários já existem
    const existingPatient = await prisma.user.findUnique({
      where: { email: 'paciente@teste.com' },
    });

    const existingPhysician = await prisma.user.findUnique({
      where: { email: 'medico@teste.com' },
    });

    if (existingPatient) {
      console.log('⚠️  Usuário Paciente já existe, pulando criação...');
    } else {
      // Criar usuário Paciente de teste
      const patientUser = await prisma.user.create({
        data: {
          email: 'paciente@teste.com',
          password: hashedPassword,
          userType: 'PATIENT',
        },
      });

      await prisma.patient.create({
        data: {
          userId: patientUser.id,
          fullName: 'Maria Santos',
          dateOfBirth: new Date('1980-05-15'),
          phone: '(11) 98765-4321',
          address: 'Rua das Flores, 123 - São Paulo, SP',
        },
      });

      console.log('✅ Usuário Paciente criado:', patientUser.email);
    }

    if (existingPhysician) {
      console.log('⚠️  Usuário Médico já existe, pulando criação...');
    } else {
      // Criar usuário Médico de teste
      const physicianUser = await prisma.user.create({
        data: {
          email: 'medico@teste.com',
          password: hashedPassword,
          userType: 'PHYSICIAN',
        },
      });

      const physician = await prisma.physician.create({
        data: {
          userId: physicianUser.id,
          fullName: 'Dr. João Silva',
          crm: 'CRM123456',
          specialty: 'Clínico Geral',
          phone: '(11) 91234-5678',
        },
      });

      // Criar notificações de exemplo
      await prisma.notification.create({
        data: {
          physicianId: physician.id,
          title: 'Interação Medicamentosa',
          message: 'Interação grave entre Varfarina e Aspirina detectada!',
          type: 'CRITICAL',
          isRead: false,
        },
      });

      await prisma.notification.create({
        data: {
          physicianId: physician.id,
          title: 'Evento Adverso',
          message: 'Paciente relatou náuseas e tonturas graves',
          type: 'HIGH',
          isRead: false,
        },
      });

      console.log('✅ Usuário Médico criado:', physicianUser.email);
      console.log('✅ Notificações de exemplo criadas');
    }

    console.log('\n📋 Credenciais de teste:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 PACIENTE:');
    console.log('   Email: paciente@teste.com');
    console.log('   Senha: 123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚕️  MÉDICO:');
    console.log('   Email: medico@teste.com');
    console.log('   Senha: 123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error: any) {
    console.error('❌ Erro ao executar seed:', error.message);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

