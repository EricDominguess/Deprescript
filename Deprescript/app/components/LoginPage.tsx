import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link } from 'expo-router';

export default function LoginPage() {
  const [isPhysicianLogin, setIsPhysicianLogin] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para controlar a visibilidade da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleLoginMode = (isPhysician) => {
    setIsPhysicianLogin(isPhysician);
    setEmail('');
    setPassword('');
    // Resetar a visibilidade da senha ao trocar de modo
    setIsPasswordVisible(false);
    Animated.timing(slideAnimation, {
      toValue: isPhysician ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = () => {
    if (isPhysicianLogin) {
      console.log('Login Médico:', { email, password });
    } else {
      console.log('Login Paciente:', { email, password });
    }
  };

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const sliderTranslateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 155],
  });

  // Função para lidar com a autenticação biométrica com a biblioteca do Expo
  const handleBiometricLogin = async () => {
    try {
      // 1. Verifica se o hardware do dispositivo suporta biometria
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Autenticação biométrica não suportada neste dispositivo.');
        return;
      }

      // 2. Verifica se o usuário tem biometria cadastrada
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Nenhuma biometria cadastrada. Por favor, configure a biometria nas configurações do seu dispositivo.');
        return;
      }

      // 3. Autentica o usuário
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticação Biométrica',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar senha',
      });

      if (success) {
        Alert.alert('Sucesso!', 'Login biométrico realizado com sucesso.');
        console.log('Login biométrico bem-sucedido!');
      } else {
        console.log('O usuário cancelou ou a autenticação falhou');
      }
    } catch (error) {
      console.error('Um erro inesperado ocorreu com a biometria:', error);
      Alert.alert('Erro', 'Ocorreu um erro durante o login por biometria.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <View style={style.innerContainer}>
        <Image nativeID="nova_logo"
          source={require("../../assets/Deprescript_logo.png")}
          style={style.logo}
        />
        <Text nativeID="sub_titulo" style={style.sub_titulo}>Deprescribing Excellence</Text>

        {/* --- Seletor de Tipo de Login com Toggle Animado --- */}
        <View style={style.toggleWrapper}>
          <View style={style.toggleContainer}>
            <Animated.View
              style={[
                style.slider,
                { transform: [{ translateX: sliderTranslateX }] },
              ]}
            />
            <TouchableOpacity style={style.toggleButton} onPress={() => toggleLoginMode(false)} activeOpacity={1}>
              <Text style={[style.toggleText, !isPhysicianLogin && style.toggleTextActive]}>
                👤 Patient
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.toggleButton} onPress={() => toggleLoginMode(true)} activeOpacity={1}>
              <Text style={[style.toggleText, isPhysicianLogin && style.toggleTextActive]}>
                ⚕️ Physician
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Formulário de Login Unificado --- */}
        <View style={style.formContainer}>
            {/* Campo de Email */}
            <TextInput
              style={style.input}
              placeholder="Email Adress"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {/* Container para o campo de senha e o ícone */}
            <View style={style.passwordContainer}>
              <TextInput
                style={style.inputPassword} // Usa um estilo um pouco diferente para não ter largura 100%
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                // A visibilidade agora é controlada pelo estado 'isPasswordVisible'
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={style.eyeIcon}>
                <Icon
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {/* Botão de Login */}
            <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
              <Text style={style.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Divisor "OR" */}
            <View style={style.dividerContainer}>
              <View style={style.dividerLine} />
              <Text style={style.dividerText}>OR</Text>
              <View style={style.dividerLine} />
            </View>

            {/* Botão de Autenticação Biométrica */}
            <TouchableOpacity style={style.biometricButton} onPress={handleBiometricLogin}>
              <Icon name="finger-print-outline" size={24} color="#047857" style={style.biometricIcon} />
              <Text style={style.biometricButtonText}>Use Biometric Authentication</Text>
            </TouchableOpacity>

            {/* Links de Navegação */}
            <View style={style.footerLinksContainer}>
              <Link href="/components/ForgotPasswordPage" asChild>
                <TouchableOpacity>
                  <Text style={style.footerLinkText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/components/SignInPage" asChild>
                <TouchableOpacity>
                  <Text style={style.footerText}>
                    Não tem uma conta? <Text style={style.footerLinkText}>Cadastre-se</Text>
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  sub_titulo: {
    fontSize: 12.5,
    color: 'black',
    textAlign: 'center',
    marginTop: -25,
    marginBottom: 30,
  },
  toggleWrapper: {
    marginBottom: 30,
  },
  toggleContainer: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 4,
    width: 310,
  },
  slider: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 147,
    height: '97%',
    backgroundColor: '#047857',
    borderRadius: 8,
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: 310,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 310,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputPassword: {
    flex: 1, 
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },
  loginButton: {
    width: 310,
    height: 50,
    backgroundColor: '#047857',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // --- ESTILOS PARA O DIVISOR E BIOMETRIA ---
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 310,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#047857',
  },
  biometricIcon: {
    marginRight: 12,
  },
  biometricButtonText: {
    color: '#047857',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // --- ESTILOS PARA OS LINKS DO RODAPÉ ---
  footerLinksContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 15,
  },
  footerLinkText: {
    color: '#047857', 
    fontWeight: 'bold',
    fontSize: 14,
  },
});
