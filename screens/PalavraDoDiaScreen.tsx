import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import  colors  from '../styles/colors'; 

const PalavraDoDiaScreen = () => {
  const [devocional, setDevocional] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevocional = async () => {
      const hoje = new Date().toISOString().split('T')[0];
      console.log('Buscando devocional para:', hoje);
      const docRef = doc(db, 'devocionais', hoje);
  
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDevocional(docSnap.data());
        } else {
          console.log('Nenhum devocional encontrado para hoje');
          setDevocional({
            titulo: 'Sem devocional hoje',
            versiculo: '',
            mensagem: 'Ainda não foi cadastrada uma palavra para hoje.',
            autor: '',
          });
        }
      } catch (error) {
        console.error('Erro ao buscar devocional:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDevocional();
  }, []);
  

  if (loading || !devocional) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.azulCeleste} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{devocional.titulo}</Text>
      <Text style={styles.versiculo}>{devocional.versiculo}</Text>
      <Text style={styles.mensagem}>{devocional.mensagem}</Text>
      <Text style={styles.autor}>{devocional.autor}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.branco,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.azulRei,
    marginBottom: 10,
    textAlign: 'center',
  },
  versiculo: {
    fontSize: 18,
    fontStyle: 'italic',
    color: colors.turquesa,
    marginBottom: 10,
    textAlign: 'center',
  },
  mensagem: {
    fontSize: 16,
    color: colors.azulRei,
    marginBottom: 20,
    textAlign: 'justify',
  },
  autor: {
    fontSize: 14,
    textAlign: 'right',
    color: colors.laranjaMissionario,
  },
});

export default PalavraDoDiaScreen;
