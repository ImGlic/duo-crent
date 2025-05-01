import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/'; 

const CreationWorldScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const islandSize = screenWidth * 0.22;

  // Ajuste nas posições das ilhas com mais espaço para scroll
  const creationDays = [
    { day: 1, title: "Luz", icon: "sun-o", top: 100, left: '10%', color: '#FFD700' },
    { day: 2, title: "Céu", icon: "cloud", top: 250, left: '60%', color: '#87CEEB' },
    { day: 3, title: "Terra", icon: "leaf", top: 400, left: '20%', color: '#2E8B57' },
    { day: 4, title: "Astros", icon: "star", top: 550, left: '65%', color: '#F4A460' },
    { day: 5, title: "Peixes", icon: "twitter", top: 700, left: '30%', color: '#1E90FF' },
    { day: 6, title: "Animais", icon: "paw", top: 850, left: '60%', color: '#8B4513' },
    { day: 7, title: "Descanso", icon: "bed", top: 1000, left: '20%', color: '#9370DB' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho fixo */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTopText}>Línea 1. Unidades 1</Text>
            <Text style={styles.headerTitle}>Criação do mundo</Text>
          </View>
          
          <TouchableOpacity style={styles.guideButton}>
            <Icon name="book" size={16} color="#0056D2" />
            <Text style={styles.guideText}> guia</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ScrollView para permitir rolagem */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Container das ilhas com altura suficiente */}
        <View style={[styles.mapContainer, { height: 1200 }]}>
          {creationDays.map((day) => (
            <View key={day.day} style={[styles.islandWrapper, { top: day.top, left: day.left }]}>
              <TouchableOpacity
                style={[
                  styles.island,
                  { 
                    backgroundColor: day.color,
                    width: islandSize,
                    height: islandSize,
                  }
                ]}
                activeOpacity={0.7}
              >
                <Icon name={day.icon} size={28} color="#FFF" />
                <Text style={styles.islandText}>{day.title}</Text>
              </TouchableOpacity>
              
              {day.day === 1 && (
                <View style={styles.startLabel}>
                  <Text style={styles.startLabelText}>começar</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTopText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056D2',
  },
  guideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0056D2',
  },
  guideText: {
    color: '#0056D2',
    fontSize: 14,
  },
  mapContainer: {
    position: 'relative',
    marginTop: 10,
  },
  islandWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  island: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  islandText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  startLabel: {
    position: 'absolute',
    top: -25,
    backgroundColor: '#0056D2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  startLabelText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CreationWorldScreen;