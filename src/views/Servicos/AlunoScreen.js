// screens/AlunosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const AlunosScreen = () => {
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://192.168.0.109:3001/aluno')
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar alunos:', error);
      });
  }, []);

  

  const handleValueChange = (itemValue) => {
    setSelectedAluno(itemValue);
    if (itemValue !== '') {
      console.log("Alunos:", alunos); // Verifica se alunos está preenchido corretamente
      const alunoSelecionado = alunos.find(aluno => aluno.chave_aluno === itemValue);
      console.log("Aluno selecionado:", alunoSelecionado); // Verifica se o aluno selecionado está sendo encontrado
      navigation.navigate('TreinoScreen', { aluno: alunoSelecionado });
    }
  };

  if (alunos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione o aluno desejado:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAluno}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o aluno desejado" value="" />
          {alunos.map(aluno => (
            <Picker.Item 
              key={aluno.chave_aluno} 
              label={aluno.nome_aluno} 
              value={aluno.chave_aluno} 
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
});

export default AlunosScreen;
