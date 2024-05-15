import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o pacote de ícones



const InputField = ({ placeholder, secureTextEntry }) => (
  <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="#fff" secureTextEntry={secureTextEntry} />
);

const Button = ({ text, onPress, disabled }) => (
  <TouchableOpacity style={[styles.loginButton, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled}>
    <Text style={styles.loginButtonText}>{text}</Text>
  </TouchableOpacity>
);

const CheckBox = ({ label, checked, onChange }) => (
  <View style={styles.checkBox}>
    <TouchableOpacity onPress={onChange}>
      <MaterialIcons name={checked ? 'check-box' : 'check-box-outline-blank'} size={24} color={checked ? '#FFA000' : '#fff'} />
    </TouchableOpacity>
    <Text style={styles.checkBoxLabel}>{label}</Text>
  </View>
);

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
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
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  
  const navigateToInicioScreen = () => {
    navigation.navigate('InicioScreen');
  };

  const handleNavigateBack = () => {
    if (!checked) {
      Alert.alert('Erro', 'Você deve aceitar os termos e condições para continuar.');
      return;
    }
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (senha !== confirmarSenha || confirmarSenha !== senha) {
      Alert.alert('Erro', 'A senha e a confirmação de senha devem ser iguais.');
      return;
    }
    navigation.goBack(); // Corrigido para voltar para a tela anterior
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
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
      <TouchableOpacity style={styles.backButton} onPress={navigateToInicioScreen}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {!isKeyboardVisible && (
          <Text style={styles.appName}>
            <Text style={styles.blueText}>HIPERTROF</Text>
            <Text style={styles.orangeText}>.IA</Text>
          </Text> 
        )}
        <Text style={styles.regdescription}>Digite suas informações para cadastro</Text>
        <InputField placeholder="Nome" />
        <InputField placeholder="Email" />
        <InputField placeholder="Senha" secureTextEntry={true} />
        <InputField placeholder="Confirmar Senha" secureTextEntry={true} />
        <CheckBox label="Aceito os termos e condições" checked={checked} onChange={() => setChecked(!checked)} />
        <Button text="CONFIRMAR" onPress={handleNavigateBack} disabled={!checked} />
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
  regdescription:{
    fontFamily:'CorporateSBold',
    color:'#fff',
    fontSize:18,
    marginBottom:20,
    opacity:0.4,
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
  orangeText:{
    color:'#FFA000',
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

  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop:10
  },
  checkBoxLabel: {
    color: '#fff',
    marginLeft: 8,
  },

  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    width:'90%',
    borderRadius: 10,
    marginTop: 50,
    alignItems:'center'
  },
  disabledButton: {
    opacity: 0.9,
  },
});

export default CadastroScreen;