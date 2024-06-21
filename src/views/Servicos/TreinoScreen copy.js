import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; 


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


const workoutData = [
  {
    day: 'Segunda-feira',
    exercises: [
      { name: 'Exercise 1' },
      { name: 'Exercise 2' },
      // Add more exercises as needed
    ],
  },
  {
    day: 'Terça-feira',
    exercises: [
      { name: 'Exercise 3' },
      { name: 'Exercise 4' },
      // Add more exercises as needed
    ],
  },
  // Add more days as needed
];

const ExerciseList = ({ route }) => {
  const { day } = route.params;
  return (
    <View>
      {day.exercises.map((exercise, index) => (
        <TouchableOpacity key={index}>
          <Text>{exercise.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TreinoScreen = () => {
  const [alunos, setAlunos] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    axios.get('http://192.168.56.1:3001/aluno')
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Text>Selecione o nome do aluno</Text>
      <Picker selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {alunos.map((aluno, index) => (
          <Picker.Item key={index} label={aluno.nome_aluno} value={aluno.nome_aluno} />
        ))}
      </Picker>
      <Tab.Navigator>
        <Tab.Screen name="Segunda-feira" component={ExerciseList} initialParams={{ day: workoutData[0] }} />
        <Tab.Screen name="Terça-feira" component={ExerciseList} initialParams={{ day: workoutData[1] }} />
{/*        <Tab.Screen name="Segunda-feira" component={ExerciseList} initialParams={{ day: workoutData[0] }} />
        <Tab.Screen name="Terça-feira" component={ExerciseList} initialParams={{ day: workoutData[1] }} /> */}
        {/* Adicione mais abas conforme necessário */}
      </Tab.Navigator>
    </View>
  );
};

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Treino" component={TreinoScreen} />
      {/* Adicione mais telas conforme necessário */}
    </Stack.Navigator>
  );
};

export default App;
