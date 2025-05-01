// components/BooksAndVerses.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BooksAndVerses = ({ version, onBackPress, onFilterPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Livros e Versículos - {version}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onFilterPress('Livros')}>
        <Text style={styles.buttonText}>Buscar Livros</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onFilterPress('Versículos')}>
        <Text style={styles.buttonText}>Buscar Versículos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#0056D2',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FF9900',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BooksAndVerses;
