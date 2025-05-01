import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useThemeContext } from '../context/ThemeContext';
import Logo from '../assets/logo-duo-crent.png'; // ajuste se necessário

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      // Alert.alert('Bem-vindo!', 'Login realizado com sucesso.');
    } catch (error: any) {
      // Alert.alert('Erro no login', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Título do App */}
      <Text style={[styles.appTitle, { color: theme.colors.primary }]}>Duo Crente</Text>

      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Inputs */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, color: theme.colors.text }]}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.placeholder}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBackground, color: theme.colors.text }]}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor={theme.colors.placeholder}
      />

      {/* Botão */}
      <Pressable style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      {/* Link Criar conta */}
      <Text style={[styles.link, { color: theme.colors.secondary }]} onPress={() => navigation.navigate('Registro')}>
        Cadastrar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 40,
    resizeMode: 'cover',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    fontSize: 14,
  },
});

export default LoginScreen;
