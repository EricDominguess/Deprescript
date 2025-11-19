import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { style as sharedStyles } from '../../styles/sharedStyles';

export default function PatientHomePage() {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }

    const date = new Date();
    setCurrentDate(date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, Maria Santos</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/pages/PhysicianNotificationPage')}>
            <Icon name="notifications-outline" size={28} color="#047857" />
          </TouchableOpacity>
        </View>

        {/* My Medications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Minhas Medicações</Text>
            <TouchableOpacity style={styles.totalButton}>
              <Text style={styles.totalButtonText}>Total: 6</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.medicationCard}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>Lisinopril</Text>
              <Text style={styles.medicationDosage}>10mg - Uma vez ao dia</Text>
              <Text style={styles.nextDose}>Próxima dose: 9:00</Text>
            </View>
            <TouchableOpacity style={styles.takenButton}>
              <Text style={styles.takenButtonText}>Tomado</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.medicationCard}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>Aspirina</Text>
              <Text style={styles.medicationDosage}>81mg - Uma vez ao dia</Text>
              <Text style={styles.nextDose}>Próxima dose: 8:00</Text>
            </View>
            <TouchableOpacity style={styles.pendingButton}>
              <Text style={styles.pendingButtonText}>Pendente</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.medicationCard}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>Warfarina</Text>
              <Text style={styles.medicationDosage}>5mg - Uma vez ao dia</Text>
              <Text style={styles.nextDose}>Próxima dose: 18:00</Text>
            </View>
            <TouchableOpacity style={styles.pendingButton}>
              <Text style={styles.pendingButtonText}>Pendente</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.progressCard}
            onPress={() => router.push('/pages/MenuPage')}
          >
            <Icon name="trending-up-outline" size={32} color="#047857" />
            <Text style={styles.progressTitle}>Meu Progresso de Saúde</Text>
            <Text style={styles.progressSubtitle}>
              Você reduziu 4 medicações com segurança em 5 meses
            </Text>
            <Text style={styles.progressLink}>Ver progresso completo →</Text>
          </TouchableOpacity>
        </View>

        {/* My Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meu Plano</Text>
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planPhase}>Fase Atual: Semana 3-4</Text>
              <TouchableOpacity style={styles.phaseButton}>
                <Text style={styles.phaseButtonText}>Fase 2 de 4</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.planDosage}>5mg noturno</Text>
            <Text style={styles.planInstruction}>
              Tome um comprimido pequeno antes de dormir
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalButton: {
    backgroundColor: '#047857',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  totalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  nextDose: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  takenButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  takenButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  pendingButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pendingButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressLink: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planPhase: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  phaseButton: {
    backgroundColor: '#047857',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  phaseButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  planDosage: {
    fontSize: 16,
    color: '#047857',
    fontWeight: '600',
    marginBottom: 8,
  },
  planInstruction: {
    fontSize: 14,
    color: '#6B7280',
  },
});

