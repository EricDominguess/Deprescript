import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
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
  },
  logo_mini: {
    width: 50, // Tamanho menor para o cabeçalho
    height: 50,
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

