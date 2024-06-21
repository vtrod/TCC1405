import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Servicos from './src/views/Servicos';
import InicioScreen from './src/views/Servicos/InicioScreen';
import IndexScreen from './src/views/Servicos/IndexScreen';
import LoginScreen from './src/views/login';
import CadastroScreen from './src/views/Servicos/CadastroScreen';
import EsqueciSenhaScreen from './src/views/Servicos/EsqueciSenhaScreen';
import TreinoScreen from './src/views/Servicos/TreinoScreen';
import UserScreen from './src/views/Servicos/UserScreen';
import Cadastro from './src/views/cadastro';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="IndexScreen" component={IndexScreen} />
        <Stack.Screen name="InicioScreen" component={InicioScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="EsqueciSenhaScreen" component={EsqueciSenhaScreen} />
        <Stack.Screen name="TreinoScreen" component={TreinoScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

