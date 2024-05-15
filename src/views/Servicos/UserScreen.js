import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios'; 
import { auth } from '../../config/firebase';
import Icon from 'react-native-vector-icons/Feather';
import { signOut } from 'firebase/auth';
import { TOKEN_OPENAI } from "@env";


const Drawer = createDrawerNavigator();

const UserScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="UserScreen">
      <Drawer.Screen name="HIPERTROF.IA" component={UserScreenContent} />
    </Drawer.Navigator>
  );
};

const UserScreenContent = ({ navigation }) => {
  const usuario = auth.currentUser;
  const [nome, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [injuryHistory, setInjuryHistory] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState('');
  const [exercisePreferences, setExercisePreferences] = useState('');
  const [selectedAge, setSelectedAge] = useState(''); // idade selecionada
  const ages = Array.from(Array(89), (_, i) => i + 12); // Lista de idades de 12 a 100 anos
  const [trainingDays, setTrainingDays] = useState(''); // Estado para os dias da semana
  const [trainingHours, setTrainingHours] = useState(''); // Estado para as horas de treinamento


  
  const fitnessLevels = [
    { label: 'Escolha uma das opções abaixo', value: '' },
    { label: 'Levemente acima do peso', value: 'Levemente acima do peso' },
    { label: 'Bastante acima do peso', value: 'Bastante acima do peso' },
    { label: 'Magro', value: 'Magro' },
    { label: 'Falso magro', value: 'Falso magro' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Atlético', value: 'Atlético' },
    { label: 'Musculoso', value: 'Musculoso' }
  ];

  const formData = {
    weight,
    height,
    sex,
    fitnessLevel,
    selectedAge,
    trainingDays,
    trainingHours,
    injuryHistory: injuryHistory || 'Sem histórico de lesões',
    equipmentAvailable,
    exercisePreferences: exercisePreferences || 'em nenhum exercício',
  };
  function deslogar(){
    auth.signOut();
    navigation.replace('Login');
    
  }


  const handleGenerateTraining = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !weight || !height || !sex || !fitnessLevel || !selectedAge || !trainingDays || !trainingHours) {
        alert('Por favor, preencha todos os campos.');
        return;
    }


    let chave_aluno;

    const handleSaveStudentData = async () => {
      // Preparar o objeto de dados para enviar na requisição POST
      const studentData = {
        nome_aluno: nome,
        peso: weight,
        altura: height,
        sexo: sex,
        nivel: fitnessLevel,
        idade: selectedAge,
        dias: trainingDays,
        horas: trainingHours,
        lesao: injuryHistory || 'Sem histórico de lesões',
        equipdisponivel: equipmentAvailable,
        limitacao: exercisePreferences || 'em nenhum exercício'
      };
      // Enviar a requisição POST
      axios.post('http://192.168.0.109:3001/aluno', studentData)
        .then(response => {
            console.log('Dados do aluno salvos com sucesso:', response.data);
            chave_aluno = response.data.chave_aluno; // Salvar a chave do aluno
        })
        .catch(error => {
            console.error('Erro ao salvar os dados do aluno:', error);
        });
      };
      // Chame a função para salvar os dados do aluno
      handleSaveStudentData();
      console.log(equipmentAvailable);
    
    const token = TOKEN_OPENAI;
    const fazerRequisicao = async () => {
        try {
            const resposta = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo-16k',
                messages: [
                    {
                        role: 'system',
                        content: `Usuário: ${nome}, ${selectedAge} anos, ${sex}, ${fitnessLevel}, ${weight}kg`,
                    },
                    {
                        role: 'system',
                        content: 'Objetivos de Treinamento: Hipertrofia;',
                    },
                    {
                        role: 'system',
                        content: `Frequência de Treinamento Semanal: ${trainingDays} dias, ${trainingHours} horas por dia`,
                    },
                    {
                        role: 'system',
                        content: `Histórico de lesão(ões): ${injuryHistory}`,
                    },
                    {
                        role: 'system',
                        content: `Limitação de Exercício: ${exercisePreferences}, Ambiente de treino: ${equipmentAvailable}`,
                    },
                    {
                        role: 'system',
                        content: 'gere o treino para cada dia da semana no formato json ({segunda-feira:},{terça-feira:}...) organizando a semana de acordo com a quantidade de dias que o usuário irá treinar, e nos que ele não treinar, especifique: ',
                    },
                ],
                max_tokens: 2048,
                temperature: 0.1
            }, {
              headers: {
                Authorization: `Bearer ${token}` // Inclui o token de autenticação no cabeçalho de autorização
            }
            });


// Usando a função para inserir dados
const jsonData = resposta.data;
const treinoGerado = JSON.parse(jsonData.choices[0].message.content);

// Extrair os treinos de cada dia da semana do objeto JSON
let treinos = {
  "segunda": treinoGerado['segunda-feira'] ? JSON.stringify(treinoGerado['segunda-feira']) : 'Não treinar',
  "terca": treinoGerado['terça-feira'] ? JSON.stringify(treinoGerado['terça-feira']) : 'Não treinar',
  "quarta": treinoGerado['quarta-feira'] ? JSON.stringify(treinoGerado['quarta-feira']) : 'Não treinar',
  "quinta": treinoGerado['quinta-feira'] ? JSON.stringify(treinoGerado['quinta-feira']) : 'Não treinar',
  "sexta": treinoGerado['sexta-feira'] ? JSON.stringify(treinoGerado['sexta-feira']) : 'Não treinar',
  "sabado": treinoGerado['sábado'] ? JSON.stringify(treinoGerado['sábado']) : 'Não treinar',
  "domingo": treinoGerado['domingo'] ? JSON.stringify(treinoGerado['domingo']) : 'Não treinar'
};

// Preparar o objeto de dados para enviar na requisição POST
const data = {
  chave_aluno: chave_aluno,
  ...treinos
};

// Enviar a requisição POST
axios.post('http://192.168.0.109:3001/treino', data)
  .then(response => {
      console.log('Dados do treino enviados com sucesso:', response.data);
  })
  .catch(error => {
      console.error('Erro ao enviar os dados do treino:', error);
  });



            // Verificar se a resposta e a propriedade choices estão definidas
            if (resposta && resposta.data && resposta.data.choices && resposta.data.choices.length > 0) {
              // Acessar o campo "message" e imprimir seu valor
              const message = resposta.data.choices[0].message.content;
              console.log(message);
              Alert.alert('Treino gerado com sucesso!')
            } else {
              console.error("Erro ao gerar treino: Os dados retornados não estão no formato esperado.");
            }

            //tratar para resposta somente de data
          } catch (error) {
            console.error('Erro ao gerar treino:', error);
            Alert.alert('Erro ao gerar treino. Por favor, tente novamente mais tarde.');
        }
    };

    // Chame a função para fazer a requisição
    fazerRequisicao();
};
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Ícone de menu */}
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
          </TouchableOpacity>
          <Text style={styles.headerText}>Preencha o formulário abaixo:</Text>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso (em kg)"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="Altura (em cm)"
            value={height}
            onChangeText={setHeight}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Idade:</Text>
            <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedAge}
              onValueChange={(itemValue) => setSelectedAge(itemValue)}
            >
              <Picker.Item label="Selecione sua idade" value="" color="#666666"/>
              {ages.map((age) => (
                <Picker.Item key={age} label={`${age} anos`} value={age}  color="#666666"/>
              ))}
            </Picker>
          </View>
          </View>
          <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Sexo:</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={styles.picker}
      selectedValue={sex}
      onValueChange={(itemValue) => setSex(itemValue)}
    >
      <Picker.Item label="Selecione o sexo" value="" color="#666666" />
      <Picker.Item label="Masculino" value="Masculino" />
      <Picker.Item label="Feminino" value="Feminino" />
    </Picker>
  </View>
</View>



<View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Nível de atividade:</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={styles.picker}
      selectedValue={fitnessLevel}
      onValueChange={(itemValue) => setFitnessLevel(itemValue)}
    >
      {fitnessLevels.map((level, index) => (
        <Picker.Item key={index} label={level.label} value={level.value} color="#666666" />
      ))}
    </Picker>
</View>
</View>



          <TextInput
            style={styles.input}
            placeholder="Histórico de lesões (se houver)"
            value={injuryHistory}
            onChangeText={setInjuryHistory} 
          />

<Text style={[styles.inputLabel, { marginBottom: -15 }]}>Dias/Semana:</Text>
<View style={styles.inputContainer1}>
  <View style={[styles.daysInputContainer, styles.inputWithBorder]}>
    <Picker
      style={styles.picker}
      selectedValue={trainingDays}
      onValueChange={(itemValue) => setTrainingDays(itemValue)}
    >
      {/* Opções para os dias da semana */}
      <Picker.Item label="1" value="1" />
      <Picker.Item label="2" value="2" />
      <Picker.Item label="3" value="3" />
      <Picker.Item label="4" value="4" />
      <Picker.Item label="5" value="5" />
      <Picker.Item label="6" value="6" />
      <Picker.Item label="7" value="7" />
    </Picker>
  </View>
  <View style={styles.hoursInputContainer}>
    <Text style={styles.inputLabel}>Horas/Dia:</Text>
    <TextInput
      style={styles.input}
      placeholder="Horas"
      keyboardType="numeric"
      value={trainingHours}
      onChangeText={setTrainingHours}
    />
  </View>
</View>

          <TextInput
            style={styles.input}
            placeholder="Ambiente de treino (academia, casa...)"
            value={equipmentAvailable}
            onChangeText={setEquipmentAvailable}
          />
          <TextInput
            style={styles.input}
            placeholder="Limitação em exercício(s) (se houver)"
            value={exercisePreferences}
            onChangeText={setExercisePreferences}
          />
        </View>
        <TouchableOpacity style={styles.gerarButton} onPress={handleGenerateTraining}>
          <Text style={styles.buttonText}>Gerar treino com IA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:0,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:5,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#b5b5b5', // Define a cor do texto dentro do Picker
    backgroundColor: '#fff', // Define o background color do Picker
  },

  //view do select
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 0, // Adicionando preenchimento para separar o texto dos campos
    paddingLeft:10,
  },

  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  inputContainerDispo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:5,
    height:50,
  },

  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFA000',
    fontSize: 20,
    fontFamily: 'CorporateSBold',
  },
  gerarButton: {
    backgroundColor: '#120f25',
    paddingVertical: 12,
    width:'100%',
    borderRadius: 10,
    marginTop: 10,
    alignItems:'center'
  },

pickerContainer: {
  flex: 1,
  borderWidth: 0.01,
  borderColor: '',
  borderRadius: 5,
  marginLeft: 10,
  height:50,
  backgroundColor: '#fff',
  overflow: 'hidden', // Garante que o conteúdo extra seja cortado
},

  picker: {
    height: 5,
    color: '#b5b5b5',
    backgroundColor: '#fff',
  },

//disponibilidade de tempo
timeInputContainer: {
  flexDirection: 'row', // Para colocar os campos em linha
  alignItems: 'center',
  flex: 1, // Para ocupar o espaço disponível
},
timePicker: {
  flex: 1,
  marginRight: 10,
},
hoursInput: {
  flex: 1,
},

daysInputContainer: {
  flex: 1,
  marginRight: 10,
  flexDirection: 'column',
  overflow: 'hidden', // Garante que o conteúdo extra seja cortado
  paddingBottom: 46,
  paddingTop: -10,
  marginTop:6,


},
hoursInputContainer: {
  flex: 1,
},
inputLabel: {
  color: '#666666',
  fontSize: 14,
  marginBottom: 5,
  
},
inputWithBorder: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  height:40,
  

},
botao: {
  color:'#666'
},
});

export default UserScreen;
