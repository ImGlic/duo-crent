import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useThemeContext } from '../context/ThemeContext';
import imageRegistro from '../assets/create-account.png'; // ajuste o caminho se necessário

const RegisterScreen = ({ navigation }: any) => {
  const { theme } = useThemeContext();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert("Conta criada!", "Você já pode fazer login.");
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert("Erro ao registrar", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Header: imagem e título */}
      <View style={styles.header}>
        <Image source={imageRegistro} style={styles.logo} />
        <Text style={[styles.appTitle, { color: theme.colors.primary }]}>Cadastrar</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
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

        <Pressable style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar-me</Text>
        </Pressable>

        <Text style={[styles.link, { color: theme.colors.secondary }]} onPress={() => navigation.navigate('Login')}>
          Já tem conta? Entrar
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 120,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    resizeMode: 'cover',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
  },
  form: {
    width: '100%',
    marginTop: 110, // empurra o formulário mais pra baixo
    alignItems: 'center',
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

export default RegisterScreen;
