import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image, Animated } from 'react-native';
import { Link, router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { style } from '../../styles/sharedStyles';

export default function ForgotPasswordPage() {
  const [isPhysician, setIsPhysician] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));

  const toggleUserType = (isPhysicianLogin: boolean) => {
    setIsPhysician(isPhysicianLogin);
    Animated.timing(slideAnimation, {
      toValue: isPhysicianLogin ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handlePasswordReset = () => {
    if (!email || !verificationCode || !newPassword || !confirmNewPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem.');
      return;
    }
    
    // Lógica para redefinir a senha baseada no `isPhysician`
    const userType = isPhysician ? 'Médico' : 'Paciente';
    console.log(`Redefinindo senha para ${userType}:`, { email, verificationCode });
    Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso!');
    router.back(); // Volta para a tela anterior (Login)
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
          source={require("../../assets/Deprescript_logo.png")}
          style={style.logo}
          resizeMode="contain"
        />
        <Text style={style.sub_titulo}>Deprescribing Excellence</Text>

        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 20, marginTop: 10 }}>
          Redefinir Senha
        </Text>

        {/* --- Seletor de Tipo de Usuário --- */}
        <View style={style.toggleWrapper}>
          <View style={style.toggleContainer}>
            <Animated.View style={[style.slider, { transform: [{ translateX: sliderTranslateX }] }]} />
            <TouchableOpacity style={style.toggleButton} onPress={() => toggleUserType(false)} activeOpacity={1}>
              <Text style={[style.toggleText, !isPhysician && style.toggleTextActive]}>👤 Patient</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.toggleButton} onPress={() => toggleUserType(true)} activeOpacity={1}>
              <Text style={[style.toggleText, isPhysician && style.toggleTextActive]}>⚕️ Physician</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Formulário de Redefinição --- */}
        <View style={style.formContainer}>
          <TextInput style={style.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={style.input} placeholder="Código de Verificação" value={verificationCode} onChangeText={setVerificationCode} keyboardType="numeric" />

          <View style={style.passwordContainer}>
            <TextInput style={style.inputPassword} placeholder="Nova Senha" value={newPassword} onChangeText={setNewPassword} secureTextEntry={!isPasswordVisible} />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={style.eyeIcon}>
              <Icon name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={style.passwordContainer}>
            <TextInput style={style.inputPassword} placeholder="Confirmar Nova Senha" value={confirmNewPassword} onChangeText={setConfirmNewPassword} secureTextEntry={!isConfirmPasswordVisible} />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={style.eyeIcon}>
              <Icon name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={style.loginButton} onPress={handlePasswordReset}>
            <Text style={style.loginButtonText}>Redefinir Senha</Text>
          </TouchableOpacity>
        </View>

        {/* Link para voltar ao Login */}
        <View style={style.footerLinksContainer}>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text style={style.footerText}>
                Lembrou a senha? <Text style={style.footerLinkText}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
