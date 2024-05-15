import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

const EsqueciSenhaScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const handleResetPasswordPress = () => {
    console.log('Email:', email);
    // Aqui você pode adicionar a lógica para resetar a senha
  };

  const navigateToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

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
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={null} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToLoginScreen}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {!isKeyboardVisible && (
          <Text style={styles.appName}>
            <Text style={styles.blueText}>HIPERTROF</Text>
            <Text style={styles.orangeText}>.IA</Text>
          </Text>
        )}
        <Text style={styles.resetPasswordTitle}>Redefina sua senha</Text>
        <Text style={styles.resetPasswordDescription}>Insira seu email abaixo e enviaremos um link para você redefinir sua senha.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPasswordPress}>
          <Text style={styles.resetPasswordButtonText}>RESETAR SENHA</Text>
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
  appName: {
    position: 'absolute',
    top: 70,
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
  resetPasswordButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    width:'90%',
    borderRadius: 10,
    marginTop: 50,
    alignItems:'center'
  },
  resetPasswordButtonText: {
    color: '#FFA000',
    fontSize: 20,
    fontFamily: 'CorporateSBold',
  },
  resetPasswordTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:-30,
  },
  resetPasswordDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default EsqueciSenhaScreen;
