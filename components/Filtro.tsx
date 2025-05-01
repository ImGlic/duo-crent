// components/FilterBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterBar = ({ onSelectFilter }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onSelectFilter('Livros')}>
        <Text style={styles.buttonText}>Filtrar por Livros</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onSelectFilter('Versículos')}>
        <Text style={styles.buttonText}>Filtrar por Versículos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '80%',
  },
  button: {
    padding: 10,
    backgroundColor: '#0056D2',
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FilterBar;
