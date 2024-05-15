import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const InicioScreen = () => {
  const navigation = useNavigation();
  const [isLoginPressed, setLoginPressed] = useState(false);
  const [isSignUpPressed, setSignUpPressed] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Carrega a fonte
  const loadFont = async () => {
    await Font.loadAsync({
      'CorporateSBold': require('../../../assets/fonts/CorporateSBold.otf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFont();
  }, []);

  const handleNavigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate('CadastroScreen');
  };

  return (
    <View style={styles.container}>
      {fontLoaded && (
        <Text style={styles.text}>
          <Text style={styles.textBlue}>HIPERTROF</Text>
          <Text style={styles.textOrange}>.IA</Text>
        </Text>
      )}
      {/* Barra horizontal */}
      <View style={styles.hr}></View>
      <TouchableOpacity 
  style={[styles.button, isSignUpPressed && styles.buttonPressed]} 
  onPressIn={() => setSignUpPressed(true)}
  onPressOut={() => setSignUpPressed(false)}
  onPress={handleNavigateToSignUp}
>
  <View style={styles.buttonContent}>
    <Image source={require('../../../assets/images/google-logo.png')} style={styles.logo} />
    <Text style={styles.buttonText}>Continuar com Google</Text>
  </View>
</TouchableOpacity>

<TouchableOpacity 
  style={[styles.button, isSignUpPressed && styles.buttonPressed]} 
  onPressIn={() => setSignUpPressed(true)}
  onPressOut={() => setSignUpPressed(false)}
  onPress={handleNavigateToSignUp} // Alterado para handleNavigateToSignUp
>
  <View style={styles.buttonContent}>
    <Image source={require('../../../assets/images/email-logo.png')} style={styles.logo} />
    <Text style={styles.buttonText}>Continuar com Email</Text>
  </View>
</TouchableOpacity>


<TouchableOpacity onPress={handleNavigateToLogin}>
  <Text style={styles.loginText}>Já possui cadastro? <Text style={styles.underlineText}>Entrar</Text></Text>
</TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#120f25',
    padding: 20,
  },
  text: {
    marginTop:100,
    flexDirection: 'row',
    marginBottom: 20,
  },
  hr: {
    width: '80%',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    marginBottom: 200,
    marginTop: 0,
    opacity:0,
  },

  logo: {
    width: 30, // ou o tamanho que você preferir
    height: 30, // ou o tamanho que você preferir
    marginLeft: -60,
    marginRight: 50
  },
  textBlue: {
    fontSize: 60,
    fontFamily: 'CorporateSBold', 
    color: '#fff',
    textShadowColor: '#D3D3D3',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
  textOrange: {
    fontSize: 60,
    fontFamily: 'CorporateSBold', 
    color: '#FFA000',
    textShadowColor: '#D3D3D3',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
  
  button: {
    backgroundColor: '#5b5579',
    padding: 13,
    borderRadius: 30,
    width: '90%',
    height:'7%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonPressed: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'CorporateSBold', 
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  
  
});

export default InicioScreen;
