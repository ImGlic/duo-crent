import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelecionarVersao = ({ onSelectVersion }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVersions = async () => {
    try {
      const response = await fetch('https://pesquisarnabiblia.com.br/api-projeto/api/get_versions.php', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer 934161ad1aabe3758871d6d919372bb2c30a75f176bfd089ae1ef3801f252d5d',
        },
      });
      const data = await response.json();
      setVersions(data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar versões');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0056D2" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return versions.map((version) => (
      <TouchableOpacity
        key={version.id}
        style={styles.button}
        onPress={() => onSelectVersion(version)}
      >
        <View style={styles.favoriteWrapper}>
          <Icon name="heart" size={20} color="#FF6347" style={styles.favoriteIcon} />
        </View>
        <Text style={styles.buttonText}>{version.name.trim()}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione uma Versão</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Remove a barra de rolagem vertical
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%', // Ocupa 100% da largura
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056D2',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center', // Centraliza os itens horizontalmente
  },
  button: {
    width: '100%',
    height: 80, // Altura fixa para todos os botões
    backgroundColor: '#0056D2',
    borderRadius: 15,
    marginVertical: 8, // Espaçamento vertical reduzido
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10, // Adiciona padding horizontal para textos longos
  },
  favoriteWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SelecionarVersao;