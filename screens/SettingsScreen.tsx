import React from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useThemeContext } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }: any) => {
  const { mode, setMode, theme } = useThemeContext(); // agora também usamos `theme`

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Alert.alert('Desconectado', 'Você saiu com sucesso.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
    }
  };

  const temas = [
    { label: 'Claro', value: 'light' },
    { label: 'Escuro', value: 'dark' },
    { label: 'Automático', value: 'system' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Configurações</Text>

      <View style={styles.settingsOption}>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>Tema</Text>
        {temas.map((opcao) => (
          <TouchableOpacity
            key={opcao.value}
            onPress={() => setMode(opcao.value as any)}
            style={[
              styles.temaBotao,
              { borderColor: theme.colors.border },
              mode === opcao.value && { backgroundColor: theme.colors.card },
            ]}
          >
            <Text style={[styles.temaTexto, { color: theme.colors.text }]}>{opcao.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.settingsOption}>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>Notificações</Text>
      </View>

      <View style={styles.settingsOption}>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>Privacidade</Text>
      </View>

      <Button title="Sair" onPress={handleLogout} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  settingsOption: {
    marginVertical: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  temaBotao: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  temaTexto: {
    fontSize: 16,
  },
});

export default SettingsScreen;
