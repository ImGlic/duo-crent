import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tabs from './Tabs';

// Telas acessadas por fora do menu inferior
import RankingScreen from '../screens/RankingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SonsScreen from '../screens/SonsScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
      <Stack.Screen name="Configurações" component={SettingsScreen} />
      <Stack.Screen name="Sons" component={SonsScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
    </Stack.Navigator>
  );
}
