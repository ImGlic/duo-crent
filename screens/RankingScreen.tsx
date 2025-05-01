import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RankingScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Button title="Voltar" onPress={handleGoBack} />
      <Text style={styles.title}>Ranking</Text>
      <Text style={styles.text}>Veja quem está no topo da fé e do conhecimento bíblico! ✨</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center' },
});

export default RankingScreen;
