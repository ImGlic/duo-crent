import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PerfilScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const paddingHorizontal = 16;
  
  // Garante que o tab bar permaneça visível quando esta tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarVisible: true
      });
    }, [navigation])
  );

  // Altura do notch do iPhone
  const notchHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: notchHeight }]}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho do perfil */}
        <View style={[styles.profileHeader, {paddingHorizontal}]}>
          <Image
            source={{ uri: 'https://www.example.com/user-profile.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Victor</Text>
            <Text style={styles.userHandle}>@Victor574198</Text>
            <Text style={styles.userSince}>Aqui desde novembro de 2018</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={[styles.statsContainer, {paddingHorizontal}]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>+2</Text>
            <Text style={styles.statLabel}>Cursos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Segue</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
        </View>

        {/* Botão de adicionar amigos */}
        <TouchableOpacity 
          style={[styles.addFriendsButton, {marginHorizontal: paddingHorizontal}]}
          activeOpacity={0.8}
        >
          <Text style={styles.addFriendsButtonText}>+ ADICIONAR AMIGOS</Text>
        </TouchableOpacity>

        {/* Seção de completar perfil */}
        <View style={[styles.completeProfileSection, {marginHorizontal: paddingHorizontal}]}>
          <Text style={styles.sectionTitle}>Termine o seu perfil!</Text>
          <Text style={styles.sectionSubtitle}>FALTAM 2 PASSOS</Text>
          <TouchableOpacity 
            style={styles.completeProfileButton}
            activeOpacity={0.8}
          >
            <Text style={styles.completeProfileButtonText}>COMPLETAR PERFIL</Text>
          </TouchableOpacity>
        </View>

        {/* Visão geral */}
        <View style={[styles.overviewSection, {marginHorizontal: paddingHorizontal}]}>
          <Text style={styles.sectionTitle}>Visão geral</Text>
          
          <View style={styles.overviewStats}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>1</Text>
              <Text style={styles.overviewLabel}>Dia seguido</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>1</Text>
              <Text style={styles.overviewLabel}>SEMANA</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>1º</Text>
              <Text style={styles.overviewLabel}>Prata</Text>
              <Text style={styles.overviewLabel}>Divisão</Text>
            </View>
          </View>

          <View style={styles.xpContainer}>
            <View style={styles.xpItem}>
              <Text style={styles.xpNumber}>1901</Text>
              <Text style={styles.xpLabel}>Total de XP</Text>
            </View>
            <View style={styles.xpItem}>
              <Text style={styles.xpNumber}>10</Text>
              <Text style={styles.xpLabel}>Destinação da inalta</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30, // Espaço extra para o tab bar
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userHandle: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  userSince: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056D2',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addFriendsButton: {
    backgroundColor: '#0056D2',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 5,
  },
  addFriendsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  completeProfileSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  completeProfileButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  completeProfileButtonText: {
    color: '#0056D2',
    fontWeight: 'bold',
  },
  overviewSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  overviewItem: {
    alignItems: 'center',
    flex: 1,
  },
  overviewNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056D2',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  xpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  xpItem: {
    alignItems: 'center',
    flex: 1,
  },
  xpNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056D2',
  },
  xpLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default PerfilScreen;