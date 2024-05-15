import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { cadastrar } from '../servicos/requisicoesFirebase';


 
interface InputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  error: boolean; 
  messageError: string;
}

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, secureTextEntry, onChangeText, error, messageError }) => (

<TextInput
  style={[styles.input, error && styles.inputError]} 
  placeholder={placeholder}
  placeholderTextColor="#fff"
  secureTextEntry={secureTextEntry}
  onChangeText={onChangeText}
/>
)

const Button: React.FC<ButtonProps> = ({ text, onPress, disabled }) => (
  <TouchableOpacity style={[styles.loginButton, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled}>
    <Text style={styles.loginButtonText}>{text}</Text>
  </TouchableOpacity>
);

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => (
  <View style={styles.checkBox}>
    <TouchableOpacity onPress={onChange}>
      <MaterialIcons name={checked ? 'check-box' : 'check-box-outline-blank'} size={24} color={checked ? '#FFA000' : '#fff'} />
    </TouchableOpacity>
    <Text style={styles.checkBoxLabel}>{label}</Text>
  </View>
);

const CadastroScreen: React.FC = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState(''); 
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
  async function realizarCadastro() {
    if (email == ''){
      setMensagemError('Preencha com o seu email');
      setStatusError('email')
    } else if (senha == ''){
      setMensagemError('Digite uma senha');
      setStatusError('senha')
    } else if (confirmarSenha == ''){
      setMensagemError('Confirme a sua senha');
      setStatusError('confirmarSenha')
    } else if (confirmarSenha != senha){
      setMensagemError('As senhas devem ser iguais');
    } else{
      const resultado = await cadastrar(email, senha, confirmarSenha);
      if( resultado == 'sucesso') {
        Alert.alert('Usuário cadastrado com sucesso!')
        setEmail('')
        setSenha('')
        setConfirmarSenha('')
        setStatusError('')
        setMensagemError('')
      } else {
        Alert.alert(resultado);
      }
    }
  }

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
        <InputField 
        placeholder="Nome" 
        onChangeText={texto => setNome(texto)} 
        error={statusError == 'nome'}
        messageError={mensagemError}
        />
        <InputField 
        placeholder="Email" 
        onChangeText={texto => setEmail(texto)} 
        error={statusError == 'email'} 
        messageError={mensagemError}
        />
        <InputField 
        placeholder="Senha" 
        secureTextEntry={true} 
        onChangeText={texto => setSenha(texto)} 
        error={statusError == 'senha'}
        messageError={mensagemError}
        /> 
        <InputField 
        placeholder="Confirmar Senha" 
        secureTextEntry={true} 
        onChangeText={texto => setConfirmarSenha(texto)}
         error={statusError == 'confirmarSenha'}
         messageError={mensagemError}
         />

        <CheckBox label="Aceito os termos e condições" checked={checked} onChange={() => setChecked(!checked)} />
        <Button text="CONFIRMAR" onPress={realizarCadastro} disabled={!checked} />
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
  disabledButton: {
    opacity: 0.9,
  },
  inputError: {
    borderColor: 'red', 
    borderWidth: 2, 
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CadastroScreen;
