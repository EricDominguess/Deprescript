import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhysicianNotificationPage() {
  return (
    <SafeAreaView style={styles.container}>
      {/* ===== CABEÇALHO ===== */}
      <View style={styles.header}>
        {/* --- Botão de Voltar --- */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>

        {/* --- Título --- */}
        <Text style={styles.headerTitle}>Urgent Alerts</Text>

        {/* --- Ícone de Sino (placeholder) --- */}
        <View style={styles.placeholderIcon}>
            <Icon name="notifications" size={28} color="red" />
        </View>
      </View>

      {/* ===== CONTEÚDO DA PÁGINA ===== */}
      <View style={styles.content}>
        <Text>Nenhum alerta urgente no momento.</Text>
        {/* A lista de notificações virá aqui */}
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5, // Área de toque maior
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderIcon: {
    width: 28, // Mantém o sino no lugar certo para alinhar com a seta
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
