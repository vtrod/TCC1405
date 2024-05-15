import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Keyboard } from 'react-native';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); 
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  

  //const handleLoginPress = () => {
  //  console.log('Email:', email);
  //  console.log('Senha:', password);
  //};

  const navigateToInicioScreen = () => {
    navigation.navigate('InicioScreen');
  };

  const handleForgotPassword = () => {
    navigation.navigate('EsqueciSenhaScreen');
  };

  const handleLoginPress = () => {
    navigation.navigate('UserScreen');
  };

  Font.loadAsync({
    'CorporateSBold': require('../../../assets/fonts/CorporateSBold.otf'), // Ajuste o caminho para sua fonte
  });

  return (
    <KeyboardAvoidingView behavior={null} style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigateToInicioScreen}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {!isKeyboardVisible && (
          <Text style={styles.appName}>
            <Text style={styles.blueText}>HIPERTROF</Text>
            <Text style={styles.orangeText}>.IA</Text>
          </Text> 
        )}
        <Text style={styles.descriptionText}>Digite seu email e senha para entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email ou nome de usuário"
        placeholderTextColor="#fff"
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#fff"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#120f25',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  descriptionText: {
    position:'relative',
    marginLeft:0,
    color: '#fff',
    fontSize: 18,
    marginTop: -100,
    marginBottom:30, // Adicione o espaçamento desejado entre os textos
    fontFamily: 'CorporateSBold',
    opacity:0.5,
  },
  appName: {
    position: 'absolute',
    top: 60,
    color: 'rgba(33, 33, 33, 0.9)',
    fontSize: 36,
    fontWeight: 'bold',
  },
  blueText: {
    color: '#fff',
    fontSize:50,
  },
  orangeText: {
    color: '#FFA000',
    fontSize:50,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height:50,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    width:80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingLeft: 10,
    borderRadius: 10,
    color: '#fff',
  },
  passwordVisibilityIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginLeft: '5%', 
    marginTop: 30,
    marginBottom: 0,
    padding: 0,
  },
  forgotPasswordText: {
    color:'#FFA000',
    fontSize: 12,
    opacity:1,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    width:'90%',
    borderRadius: 10,
    marginTop: 50,
    alignItems:'center'
  },

  loginButtonText: {
    color: '#FFA000',
    fontSize: 20,
    fontFamily: 'CorporateSBold',
  },
});

export default LoginScreen;
