import React, { useState } from 'react';
import { Alert, View, Text } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';


const loadFont = async () => {
  await Font.loadAsync({
    'CorporateSBold': require('../../../assets/fonts/CorporateSBold.otf'),
  });
  setFontLoaded(true);
};

export default function Cadastro({ navigation }) {  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  async function realizarCadastro(){
    if(email == ''){
      setMensagemError('Preencha com seu email');
      setStatusError('email');
    } else if(senha == ''){
      setMensagemError('Digite sua senha');
      setStatusError('senha');
    } else if(confirmaSenha == ''){
      setMensagemError('Confirme sua senha');
      setStatusError('confirmaSenha');
    } else if(confirmaSenha != senha){
      setMensagemError('As senhas não conferem!');
      setStatusError('confirmaSenha');
    } else {
      const resultado = await cadastrar(email, senha);
      setStatusError('firebase')
      if(resultado == 'sucesso') {
        setMensagemError('Usuário criado com sucesso!')
        setEmail('')
        setSenha('')
        setConfirmaSenha('')
      }
      else {
        setMensagemError(resultado)
      }
    }
  }

  return (
    <View style={estilos.container}>      
      <View style={estilos.tituloContainer}>
        <Text style={[estilos.titulo, estilos.hipertrof]}>  HIPERTROF.</Text>
        <Text style={[estilos.titulo, estilos.ia]}>IA</Text>
      </View>
      <EntradaTexto 
        label="Email"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError == 'confirmaSenha'}
        messageError={mensagemError}
      />

      <Alerta 
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}