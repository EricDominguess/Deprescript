import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { Link, router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { style } from '../../styles/sharedStyles';

export default function SignInPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignUp = () => {
    // Validação básica dos campos
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    // Lógica de cadastro (aqui você chamaria sua API)
    console.log('Cadastrando usuário:', { fullName, email, password });
    Alert.alert('Sucesso!', 'Cadastro realizado com sucesso.');
    // Navega de volta para a tela de login após o cadastro
    router.back();
  };

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

        {/* Título */}
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 20, marginTop: -10 }}>
          Crie sua Conta
        </Text>

        {/* --- Formulário de Cadastro --- */}
        <View style={style.formContainer}>
          {/* Campo de Nome Completo */}
          <TextInput
            style={style.input}
            placeholder="Nome Completo"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Campo de Email */}
          <TextInput
            style={style.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Container para o campo de senha */}
          <View style={style.passwordContainer}>
            <TextInput
              style={style.inputPassword}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={style.eyeIcon}>
              <Icon
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Container para o campo de confirmar senha */}
          <View style={style.passwordContainer}>
            <TextInput
              style={style.inputPassword}
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={style.eyeIcon}>
              <Icon
                name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Botão de Cadastrar */}
          <TouchableOpacity style={style.loginButton} onPress={handleSignUp}>
            <Text style={style.loginButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Link para voltar ao Login */}
        <View style={style.footerLinksContainer}>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text style={style.footerText}>
                Já tem uma conta? <Text style={style.footerLinkText}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
