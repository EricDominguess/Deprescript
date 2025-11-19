import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  // Tenta pegar o IP da máquina onde o Expo está rodando (para celular físico)
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (localhost && Platform.OS !== 'web') {
    return `http://${localhost}:3000`;
  }

  // Fallback para Emulador Android
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  // Para iOS Simulator ou Web
  return 'http://localhost:3000';
};

export const API_URL = getBaseUrl();

console.log('🔌 API Configurada para:', API_URL);

export const endpoints = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/signup`,
  },
};
