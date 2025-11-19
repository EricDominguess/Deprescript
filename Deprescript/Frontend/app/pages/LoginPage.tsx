import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Animated, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Link, router } from 'expo-router';
import { style } from "../../styles/sharedStyles";
import { endpoints } from "../services/api";

export default function LoginPage() {
  const [isPhysicianLogin, setIsPhysicianLogin] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verificar se existe biometria salva ao abrir a tela
  useEffect(() => {
    // checkSavedBiometrics(); // Opcional: check visual
  }, [isPhysicianLogin]); 

  const toggleLoginMode = (isPhysician: boolean) => {
    setIsPhysicianLogin(isPhysician);
    setEmail('');
    setPassword('');
    setIsPasswordVisible(false);
    Animated.timing(slideAnimation, {
      toValue: isPhysician ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  // Helper para pegar a chave correta baseada no tipo
  const getStorageKey = (type: string) => `user_credentials_${type}`;

  const handleLoginSuccess = async (userData: any, userType: string, currentPassword: string) => {
    const proceedToHome = () => {
      if (userType === 'PHYSICIAN') {
        router.push('/pages/PhysicianHomePage');
      } else {
        router.push('/pages/PatientHomePage');
      }
    };

    if (Platform.OS === 'web') {
      proceedToHome();
      return;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      proceedToHome();
      return;
    }

    // Verifica se já existe credencial salva PARA ESTE TIPO DE USUÁRIO
    const storageKey = getStorageKey(userType);
    const savedCredentials = await SecureStore.getItemAsync(storageKey);
    
    if (!savedCredentials) {
      Alert.alert(
        "Biometria",
        `Deseja habilitar o login rápido para sua conta de ${userType === 'PHYSICIAN' ? 'Médico' : 'Paciente'}?`,
        [
          {
            text: "Não, obrigado",
            style: "cancel",
            onPress: proceedToHome
          },
          {
            text: "Sim, habilitar",
            onPress: async () => {
              try {
                await SecureStore.setItemAsync(storageKey, JSON.stringify({
                  email: userData.email,
                  password: currentPassword,
                  userType: userType
                }));
                Alert.alert("Sucesso", "Biometria configurada para este perfil!");
                proceedToHome();
              } catch (err) {
                console.error(err);
                proceedToHome();
              }
            }
          }
        ]
      );
    } else {
      // Atualiza silenciosamente se já existia (para atualizar senha caso tenha mudado)
      await SecureStore.setItemAsync(storageKey, JSON.stringify({
        email: userData.email,
        password: currentPassword,
        userType: userType
      }));
      proceedToHome();
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha email e senha.');
      return;
    }

    setLoading(true);

    try {
      const userType = isPhysicianLogin ? 'PHYSICIAN' : 'PATIENT';
      
      const response = await fetch(endpoints.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        await handleLoginSuccess(data.user, userType, password);
      } else {
        Alert.alert('Falha no Login', data.error || 'Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro de login:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Erro', 'Biometria não disponível na web');
      return;
    }

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Erro', 'Biometria não suportada neste aparelho.');
        return;
      }

      // Busca a chave baseada na ABA ATUAL (Médico ou Paciente)
      const currentUserType = isPhysicianLogin ? 'PHYSICIAN' : 'PATIENT';
      const storageKey = getStorageKey(currentUserType);
      
      const savedDataString = await SecureStore.getItemAsync(storageKey);

      if (!savedDataString) {
        Alert.alert(
          'Biometria não encontrada', 
          `Nenhum login de ${currentUserType === 'PHYSICIAN' ? 'Médico' : 'Paciente'} salvo com biometria. Faça login com senha primeiro.`
        );
        return;
      }

      const savedData = JSON.parse(savedDataString);
      
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: `Login de ${currentUserType === 'PHYSICIAN' ? 'Médico' : 'Paciente'}`,
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar Senha',
      });

      if (authResult.success) {
        setLoading(true);
        
        const response = await fetch(endpoints.auth.login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: savedData.email,
            password: savedData.password,
            userType: savedData.userType,
          }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
            if (savedData.userType === 'PHYSICIAN') {
              router.push('/pages/PhysicianHomePage');
            } else {
              router.push('/pages/PatientHomePage');
            }
        } else {
          Alert.alert('Erro', 'Credenciais inválidas. Faça login manualmente.');
        }
      }

    } catch (error) {
      setLoading(false);
      console.error('Erro na biometria:', error);
      Alert.alert('Erro', 'Falha ao processar login biométrico.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const sliderTranslateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 155],
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <View style={style.innerContainer}>
        <Image 
          nativeID="nova_logo"
          source={require("../../assets/Deprescript_logo.png")}
          style={style.logo}
          resizeMode="contain"
        />
        <Text nativeID="sub_titulo" style={style.sub_titulo}>Deprescribing Excellence</Text>

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

        <View style={style.formContainer}>
            <TextInput
              style={style.input}
              placeholder="Email Address"
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
            
            <TouchableOpacity 
              style={[style.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={style.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={style.dividerContainer}>
              <View style={style.dividerLine} />
              <Text style={style.dividerText}>OR</Text>
              <View style={style.dividerLine} />
            </View>

            <TouchableOpacity 
              style={[style.biometricButton, loading && { opacity: 0.7 }]} 
              onPress={handleBiometricLogin}
              disabled={loading}
            >
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
