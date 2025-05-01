import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ComunidadeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade</Text>
      <Text style={styles.text}>
        Participe de grupos, envie pedidos de oração e cresça com outros irmãos! 🙏
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center' },
});

export default ComunidadeScreen;
