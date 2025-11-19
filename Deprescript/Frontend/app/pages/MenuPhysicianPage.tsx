import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { style as sharedStyles } from '../../styles/sharedStyles';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Itens da barra de navegação definidos fora do componente para não serem recriados
const navItems = ['Dashboard', 'Patients', 'Plans', 'Messages', 'Reports', 'Settings'];

// Componente da Barra de Navegação foi movido para fora do MenuPhysicianPage
// Ele agora recebe o estado e a função para atualizá-lo via props.
const NavBar = ({ activeTab, onTabPress }) => (
  <View style={styles.navBarContainer}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.navBarContent}
    >
      {navItems.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.navItem}
          onPress={() => onTabPress(item)}
        >
          <Text style={[styles.navText, activeTab === item && styles.activeNavText]}>{item}</Text>
          {/* Linha indicadora de aba ativa */}
          {activeTab === item && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// Criando um botão flutuante para adicionar paciente
const FloatingAddPatientButton = ({ onPress }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress}>
    <Icon name="add" size={22} color="#FFFFFF" />
    <Text style={styles.fabText}>Add Patient</Text>
  </TouchableOpacity>
);

export default function MenuPhysicianPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleAddPatient = () => {
    // Adicione aqui a lógica para navegar para a tela de adicionar paciente
    console.log("Navegar para a tela de adicionar paciente.");
  };

  return (
    // Usamos um fragmento <> para envolver SafeAreaView, permitindo que o botão
    // flutuante fique por cima de tudo, inclusive da área segura se necessário.
    <>
      <SafeAreaView style={styles.container}>
        {/* ===== CABEÇALHO ===== */}
        <View style={styles.header}>
          <Image
            nativeID="nova_logo"
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

        {/* ===== BARRA DE NAVEGAÇÃO ===== */}
        <NavBar activeTab={activeTab} onTabPress={setActiveTab} />

        {/* ===== CONTEÚDO DA PÁGINA ===== */}
        {/* Para o scroll funcionar, o conteúdo precisa estar dentro de um ScrollView */}
        <ScrollView style={styles.contentContainer}>
            <View style={styles.content}>
                <Text>Conteúdo da aba: {activeTab}</Text>
                {/* Adicione aqui conteúdo longo para testar a rolagem */}
                <Text style={{ marginTop: 20, paddingHorizontal: 20, lineHeight: 22 }}>
                    Este é um exemplo de conteúdo da página. Se a lista de pacientes for longa,
                    a tela irá rolar, mas o botão 'Add Patient' permanecerá fixo no canto
                    inferior direito (exclusivo da aba Patients), pois ele está posicionado de forma absoluta e fora
                    deste ScrollView.
                </Text>
                 <View style={{ height: 800 }} />{/* Elemento para forçar a rolagem */}
            </View>
        </ScrollView>
      </SafeAreaView>

      {/* ===== BOTÃO FLUTUANTE (FAB) ===== */}
      {/* Ele é renderizado aqui, fora do SafeAreaView principal*/}
      {/* A condição verifica se a aba 'Patients' está ativa */}
      {activeTab === 'Patients' && (
        <FloatingAddPatientButton onPress={handleAddPatient} />
      )}
    </>
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
    color: '#8DC0B3', // Corrigido para um verde mais legível
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
    color: '#4A90E2', // Cor para itens inativos
    fontWeight: '500',
  },
  activeNavText: {
    color: '#8DC0B3', // Cor para o item ativo
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
  content: {
    // Removido flex: 1 e justifyContent para permitir que o conteúdo comece do topo
    alignItems: 'center',
    paddingTop: 20, // Espaço no topo do conteúdo
  },

  // ===== ESTILOS PARA O BOTÃO FLUTUANTE (FAB) =====
  fab: {
    position: 'absolute', // Chave para a flutuação
    right: 20,          // 20 pixels da direita
    bottom: 60,         // 60 pixels de baixo
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00645B', // Cor principal verde
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,    // Totalmente arredondado
    // Sombra para dar a impressão de elevação (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8, // Espaço entre o ícone e o texto
  },
});
