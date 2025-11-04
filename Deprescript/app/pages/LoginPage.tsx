import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Animated, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import { Link, router } from 'expo-router';
import { style } from "../_styles/sharedStyles";

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
      router.push('/pages/MenuPhysicianPage');
    } else {
      console.log('Login Paciente:', { email, password });
      router.push('/pages/MenuPage');
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
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Autenticação biométrica não suportada neste dispositivo.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Nenhuma biometria cadastrada. Por favor, configure a biometria nas configurações do seu dispositivo.');
        return;
      }

      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticação Biométrica',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar senha',
      });

      if (success) {
        console.log('Login biométrico bem-sucedido!');
        if (isPhysicianLogin) {
          router.push('/pages/MenuPhysicianPage');
        } else {
          router.push('/pages/MenuPage');
        }
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
            <TextInput
              style={style.input}
              placeholder="Email Adress"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={style.passwordContainer}>
              <TextInput
                style={style.inputPassword}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
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
            <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
              <Text style={style.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={style.dividerContainer}>
              <View style={style.dividerLine} />
              <Text style={style.dividerText}>OR</Text>
              <View style={style.dividerLine} />
            </View>

            <TouchableOpacity style={style.biometricButton} onPress={handleBiometricLogin}>
              <Icon name="finger-print-outline" size={24} color="#047857" style={style.biometricIcon} />
              <Text style={style.biometricButtonText}>Use Biometric Authentication</Text>
            </TouchableOpacity>

            <View style={style.footerLinksContainer}>
              <Link href="/pages/ForgotPasswordPage" asChild>
                <TouchableOpacity>
                  <Text style={style.footerLinkText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
              </Link>
              
              {!isPhysicianLogin && (
                <Link href="/pages/SignInPage" asChild>
                  <TouchableOpacity>
                    <Text style={style.footerText}>
                      Não tem uma conta? <Text style={style.footerLinkText}>Cadastre-se</Text>
                    </Text>
                  </TouchableOpacity>
                </Link>
              )}
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
