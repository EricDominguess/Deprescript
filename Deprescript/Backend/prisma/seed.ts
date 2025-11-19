import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes (opcional - comentar em produção)
  // Nota: MongoDB não suporta deleteMany em transações sem replica set
  // Executando individualmente
  try {
    await prisma.notification.deleteMany({});
    await prisma.prescription.deleteMany({});
    await prisma.patient.deleteMany({});
    await prisma.physician.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (error) {
    console.log('⚠️  Aviso: Alguns dados podem não ter sido limpos (normal em MongoDB local)');
  }

  // Criar senha hash para os usuários de teste
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Criar usuário Paciente de teste (sem nested create para evitar transação)
  const patientUser = await prisma.user.create({
    data: {
      email: 'paciente@teste.com',
      password: hashedPassword,
      userType: 'PATIENT',
    },
  });

  const patient = await prisma.patient.create({
    data: {
      userId: patientUser.id,
      fullName: 'Maria Santos',
      dateOfBirth: new Date('1980-05-15'),
      phone: '(11) 98765-4321',
      address: 'Rua das Flores, 123 - São Paulo, SP',
    },
  });

  console.log('✅ Usuário Paciente criado:', patientUser.email);

  // Criar usuário Médico de teste (sem nested create para evitar transação)
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

  console.log('✅ Usuário Médico criado:', physicianUser.email);

  // Criar algumas notificações de exemplo para o médico
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

  console.log('✅ Notificações de exemplo criadas');

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
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

