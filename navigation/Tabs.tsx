import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import PalavraDoDiaScreen from '../screens/PalavraDoDiaScreen';
import JogosScreen from '../screens/JogosScreen';
import BibliaScreen from '../screens/BibliaScreen';
import ComunidadeScreen from '../screens/ComunidadeScreen';

const Tab = createBottomTabNavigator();

const colors = {
  azulRei: '#1A237E',
  azulCeleste: '#4FC3F7',
  turquesa: '#26C6DA',
  dourado: '#FFC107',
  branco: '#FFFFFF',
  cinzaAzulado: '#90A4AE',
  laranjaMissionario: '#FB8C00',
};

function CustomTabBarButton({ children, onPress }: any) {
  return (
    <TouchableOpacity style={styles.customButtonContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.customButton}>{children}</View>
    </TouchableOpacity>
  );
}

function MenuDropdownButton() {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation<any>();

  const handleNavigate = (screen: string) => {
    setShowMenu(false);
    navigation.navigate(screen);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {showMenu && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleNavigate('Perfil')}>
            <Text style={styles.dropdownText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('Ranking')}>
            <Text style={styles.dropdownText}>Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('Sons')}>
            <Text style={styles.dropdownText}>Sons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate('Configurações')}>
            <Text style={styles.dropdownText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.menuButton}>
        <Ionicons name="ellipsis-horizontal" size={24} color={colors.azulRei} />
      </TouchableOpacity>
    </View>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.branco,
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name="Jogos"
        component={JogosScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-game-controller" color={color} size={24} />,
          tabBarActiveTintColor: colors.azulCeleste,
          tabBarInactiveTintColor: colors.cinzaAzulado,
        }}
      />
      <Tab.Screen
        name="Devocional"
        component={PalavraDoDiaScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-book" color={color} size={24} />,
          tabBarActiveTintColor: colors.azulCeleste,
          tabBarInactiveTintColor: colors.cinzaAzulado,
        }}
      />
      <Tab.Screen
        name="Bíblia"
        component={BibliaScreen}
        options={{
          tabBarIcon: () => <Ionicons name="ios-bible" color="#fff" size={30} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Comunidade"
        component={ComunidadeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-people" color={color} size={24} />,
          tabBarActiveTintColor: colors.azulCeleste,
          tabBarInactiveTintColor: colors.cinzaAzulado,
        }}
      />
      <Tab.Screen
        name="Mais"
        component={View}
        options={{
          tabBarButton: () => <MenuDropdownButton />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.azulRei,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  menuButton: {
    padding: 10,
  },
  dropdown: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: colors.branco,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 160,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.azulRei,
    fontWeight: '500',
    paddingVertical: 6,
  },
});

export default Tabs;
