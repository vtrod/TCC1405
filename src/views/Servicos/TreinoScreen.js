import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DashboardScreen from './DashboardScreen';


const TreinoScreen = ({ route }) => {
  const [treino, setTreino] = useState(null);
  const [treinoVisivel, setTreinoVisivel] = useState({
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: false,
    domingo: false,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        if (route.params && route.params.aluno && route.params.aluno.chave_aluno) {
          const response = await axios.get(`http://192.168.0.109:3001/alunotreino/${route.params.aluno.chave_aluno}`);
          setTreino(response.data);
        } else {
          console.error('Erro: chave_aluno não está presente nos parâmetros da rota.');
        }
      } catch (error) {
        console.error('Erro ao buscar o treino:', error);
      }
    };

    fetchTreino();
  }, [route.params]);

  if (!treino) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  const toggleTreinoVisibility = (dia) => {
    setTreinoVisivel(prevState => ({
      ...prevState,
      [dia]: !prevState[dia],
    }));
  };

  const renderTreino = (dia) => {
    const treinoDia = treino[dia];
    if (!treinoDia) return null;

    const formatTreino = (treinoDia) => {
      const parsedTreino = JSON.parse(treinoDia);
      if (!parsedTreino.treino) {
        return 'Dia de descanso';
      } else {
        let exercicios = '';
        for (const grupoMuscular in parsedTreino) {
          if (grupoMuscular !== 'treino') {
            const nomeGrupoMuscular = grupoMuscular.toUpperCase();
            exercicios += `\n\n${nomeGrupoMuscular}:\n`;
            parsedTreino[grupoMuscular].forEach((exercicio) => {
              exercicios += `- ${exercicio.exercicio} (${exercicio.qtdSeries} séries, ${exercicio.repeticoes} repetições, ${exercicio.tempoDescanso} segundos de descanso)\n`;
            });
          }
        }
        return exercicios.trim();
      }
    };

    return (
      <View style={styles.diaContainer}>
        <TouchableOpacity style={styles.headerContainer} onPress={() => toggleTreinoVisibility(dia)}>
          <Text style={styles.diaLabel}>{addSuffix(dia)}:</Text>
          <Ionicons name={treinoVisivel[dia] ? 'chevron-up-outline' : 'chevron-down-outline'} size={24} color="#b5b5b5" />
        </TouchableOpacity>
        {treinoVisivel[dia] && (
          <Text style={styles.exercicios}>{formatTreino(treinoDia)}</Text>
        )}
      </View>
    );
  };

  const addSuffix = (dia) => {
    const sufixo = dia === 'sabado' || dia === 'domingo' ? '' : '-feira';
    return `${capitalizeFirstLetter(dia)}${sufixo}`;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Treino - 
          <Text style={styles.alunoName}> {route.params.aluno.nome_aluno}</Text>
        </Text>
        <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen', { aluno: route.params.aluno })}>
            <Ionicons name="bar-chart-outline" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Delete treino')}>
            <Ionicons name="trash-outline" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Edit peso')}>
          <Ionicons name="person-outline" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      {renderTreino('segunda')}
      {renderTreino('terca')}
      {renderTreino('quarta')}
      {renderTreino('quinta')}
      {renderTreino('sexta')}
      {renderTreino('sabado')}
      {renderTreino('domingo')}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  diaContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  diaLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exercicios: {
    fontSize: 16,
  },
  alunoName: {
    color: '#FFA000',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
    marginBottom:10
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginVertical: 16,
    marginTop:5,
    marginBottom:30,
  },
});

export default TreinoScreen;
