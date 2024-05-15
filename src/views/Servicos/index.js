import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './InicioScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import { SafeAreaView,StyleSheet,Image } from 'react-native';

const Stack = createStackNavigator();

const Servicos = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio" headerMode="none">
        <Stack.Screen name="InicioScreen" component={InicioScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Servicos;