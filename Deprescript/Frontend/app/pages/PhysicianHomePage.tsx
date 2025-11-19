import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { style as sharedStyles } from '../../styles/sharedStyles';

// Tipos para as props
interface DashboardContentProps {
  onAddPatient: () => void;
  onCreatePlan: () => void;
  onViewReports: () => void;
}

// Componente de conteúdo para Dashboard
const DashboardContent = ({ onAddPatient, onCreatePlan, onViewReports }: DashboardContentProps) => (
  <>
    {/* Clinical Performance Metrics */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Métricas de Desempenho Clínico</Text>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Taxa de Sucesso de Desprescrição</Text>
          <Text style={styles.metricValue}>78%</Text>
          <View style={styles.metricChange}>
            <Icon name="arrow-up" size={16} color="#10B981" />
            <Text style={styles.metricChangeText}>+5% do mês passado</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Eventos Adversos Reduzidos</Text>
          <Text style={styles.metricValue}>24</Text>
          <View style={styles.metricChange}>
            <View style={styles.blueDot} />
            <Text style={styles.metricChangeText}>12 eventos prevenidos</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Adesão do Paciente</Text>
          <Text style={styles.metricValue}>89%</Text>
          <View style={styles.metricChange}>
            <Icon name="warning" size={16} color="#F59E0B" />
            <Text style={styles.metricChangeText}>↑ 2% melhoria</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Tempo Médio de Consulta</Text>
          <Text style={styles.metricValue}>18 min</Text>
          <View style={styles.metricChange}>
            <View style={styles.greenDot} />
            <Text style={styles.metricChangeText}>Faixa ideal</Text>
          </View>
        </View>
      </View>
    </View>

    {/* Quality Indicators */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Indicadores de Qualidade</Text>
      <View style={styles.qualityCard}>
        <Text style={styles.qualityText}>
          Revisões de Medicação Concluídas: <Text style={styles.qualityValue}>142</Text>
        </Text>
        <Text style={styles.qualityText}>
          Diretrizes Clínicas Seguidas: <Text style={styles.qualityValue}>94%</Text>
        </Text>
        <TouchableOpacity style={styles.viewAnalyticsButton}>
          <Text style={styles.viewAnalyticsText}>Ver Análises Completas →</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Patient Outcome Analysis */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Análise de Resultados dos Pacientes</Text>
      <View style={styles.outcomeCard}>
        <View style={styles.outcomeItem}>
          <View style={[styles.outcomeIndicator, { backgroundColor: '#10B981' }]} />
          <View style={styles.outcomeInfo}>
            <Text style={styles.outcomePercentage}>61%</Text>
            <Text style={styles.outcomeLabel}>Melhorados</Text>
            <Text style={styles.outcomeCount}>(78 pacientes)</Text>
          </View>
        </View>

        <View style={styles.outcomeItem}>
          <View style={[styles.outcomeIndicator, { backgroundColor: '#6B7280' }]} />
          <View style={styles.outcomeInfo}>
            <Text style={styles.outcomePercentage}>25%</Text>
            <Text style={styles.outcomeLabel}>Sem Mudança</Text>
            <Text style={styles.outcomeCount}>(32 pacientes)</Text>
          </View>
        </View>

        <View style={styles.outcomeItem}>
          <View style={[styles.outcomeIndicator, { backgroundColor: '#EF4444' }]} />
          <View style={styles.outcomeInfo}>
            <Text style={styles.outcomePercentage}>13%</Text>
            <Text style={styles.outcomeLabel}>Piorados</Text>
            <Text style={styles.outcomeCount}>(17 pacientes)</Text>
          </View>
        </View>
      </View>
    </View>

    {/* Quick Actions */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Ações Rápidas</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={onAddPatient}
          activeOpacity={0.7}
        >
          <Icon name="person-add-outline" size={32} color="#047857" />
          <Text style={styles.actionText}>Adicionar Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={onCreatePlan}
          activeOpacity={0.7}
        >
          <Icon name="document-text-outline" size={32} color="#047857" />
          <Text style={styles.actionText}>Criar Plano</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={onViewReports}
          activeOpacity={0.7}
        >
          <Icon name="analytics-outline" size={32} color="#047857" />
          <Text style={styles.actionText}>Ver Relatórios</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
);

// Componente de conteúdo para Patients
const PatientsContent = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Meus Pacientes</Text>
    <View style={styles.emptyStateCard}>
      <Icon name="people-outline" size={64} color="#9CA3AF" />
      <Text style={styles.emptyStateText}>Lista de pacientes aparecerá aqui</Text>
      <Text style={styles.emptyStateSubtext}>Use "Adicionar Paciente" para começar</Text>
    </View>
  </View>
);

// Componente de conteúdo para Plans
const PlansContent = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Planos de Desprescrição</Text>
    <View style={styles.emptyStateCard}>
      <Icon name="document-text-outline" size={64} color="#9CA3AF" />
      <Text style={styles.emptyStateText}>Planos de desprescrição aparecerão aqui</Text>
      <Text style={styles.emptyStateSubtext}>Use "Criar Plano" para começar</Text>
    </View>
  </View>
);

// Componente de conteúdo para Messages
const MessagesContent = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Mensagens</Text>
    <View style={styles.emptyStateCard}>
      <Icon name="chatbubbles-outline" size={64} color="#9CA3AF" />
      <Text style={styles.emptyStateText}>Nenhuma mensagem no momento</Text>
    </View>
  </View>
);

// Componente de conteúdo para Reports
const ReportsContent = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Relatórios</Text>
    <View style={styles.emptyStateCard}>
      <Icon name="analytics-outline" size={64} color="#9CA3AF" />
      <Text style={styles.emptyStateText}>Relatórios aparecerão aqui</Text>
      <Text style={styles.emptyStateSubtext}>Use "Ver Relatórios" para acessar</Text>
    </View>
  </View>
);

// Componente de conteúdo para Settings
const SettingsContent = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Configurações</Text>
    <View style={styles.settingsCard}>
      <TouchableOpacity style={styles.settingItem}>
        <Icon name="person-outline" size={24} color="#047857" />
        <Text style={styles.settingText}>Perfil</Text>
        <Icon name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Icon name="notifications-outline" size={24} color="#047857" />
        <Text style={styles.settingText}>Notificações</Text>
        <Icon name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Icon name="lock-closed-outline" size={24} color="#047857" />
        <Text style={styles.settingText}>Segurança</Text>
        <Icon name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Icon name="help-circle-outline" size={24} color="#047857" />
        <Text style={styles.settingText}>Ajuda</Text>
        <Icon name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function PhysicianHomePage() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleAddPatient = () => {
    console.log('Adicionar Paciente clicado');
    Alert.alert(
      'Adicionar Paciente',
      'Funcionalidade em desenvolvimento. Em breve você poderá adicionar novos pacientes aqui.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ir para Pacientes', 
          onPress: () => setActiveTab('Patients')
        }
      ]
    );
    // TODO: Implementar navegação ou modal para adicionar paciente
    // router.push('/pages/AddPatientPage');
  };

  const handleCreatePlan = () => {
    console.log('Criar Plano clicado');
    Alert.alert(
      'Criar Plano',
      'Funcionalidade em desenvolvimento. Em breve você poderá criar planos de desprescrição aqui.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ir para Planos', 
          onPress: () => setActiveTab('Plans')
        }
      ]
    );
    // TODO: Implementar navegação ou modal para criar plano
    // router.push('/pages/CreatePlanPage');
  };

  const handleViewReports = () => {
    console.log('Ver Relatórios clicado');
    setActiveTab('Reports');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardContent onAddPatient={handleAddPatient} onCreatePlan={handleCreatePlan} onViewReports={handleViewReports} />;
      case 'Patients':
        return <PatientsContent />;
      case 'Plans':
        return <PlansContent />;
      case 'Messages':
        return <MessagesContent />;
      case 'Reports':
        return <ReportsContent />;
      case 'Settings':
        return <SettingsContent />;
      default:
        return <DashboardContent onAddPatient={handleAddPatient} onCreatePlan={handleCreatePlan} onViewReports={handleViewReports} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/Deprescript_logo.png")}
          style={sharedStyles.logo_mini}
          resizeMode="contain"
        />
        <View style={styles.rightHeaderGroup}>
          <TouchableOpacity onPress={() => router.push("/pages/PhysicianNotificationPage")}>
            <Icon name="notifications-outline" size={30} color="#00645B" />
          </TouchableOpacity>
          <View style={styles.hipaaBadge}>
            <Icon name="shield-checkmark-outline" size={18} color="#008060" />
            <Text style={styles.hipaaText}>HIPAA Secure</Text>
          </View>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.navBarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navBarContent}
        >
          {['Dashboard', 'Patients', 'Plans', 'Messages', 'Reports', 'Settings'].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.navItem}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>
                {item}
              </Text>
              {activeTab === item && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  rightHeaderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hipaaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2F0',
    borderWidth: 1,
    borderColor: '#B2DFD8',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  hipaaText: {
    color: '#8DC0B3',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
  navBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
  },
  navBarContent: {
    paddingHorizontal: 15,
  },
  navItem: {
    paddingVertical: 12,
    marginRight: 20,
  },
  navText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#8DC0B3',
    fontWeight: 'bold',
  },
  activeIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: '#00645B',
    marginTop: 6,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  qualityCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qualityText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  qualityValue: {
    fontWeight: 'bold',
    color: '#111827',
  },
  viewAnalyticsButton: {
    marginTop: 8,
  },
  viewAnalyticsText: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
  },
  outcomeCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  outcomeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  outcomeInfo: {
    flex: 1,
  },
  outcomePercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  outcomeLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  outcomeCount: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyStateCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  settingsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
});

