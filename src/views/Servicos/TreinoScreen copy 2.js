// screens/TreinoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const TreinoScreen = ({ route }) => {
  const [treino, setTreino] = useState(null);

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        if (route.params && route.params.aluno && route.params.aluno.chave_aluno) {
          const response = await axios.get(`http://192.168.0.109:3001/treino/${route.params.aluno.chave_aluno}`);
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

  // Função para tratar os dados do treino
  const formatTreino = (treinoDia) => {
    const parsedTreino = JSON.parse(treinoDia);
    if (!parsedTreino.treino) {
      return 'Dia de descanso';
    } else {
      let exercicios = '';
      for (const grupoMuscular in parsedTreino) {
        if (grupoMuscular !== 'treino') {
          // Deixa o nome do grupo muscular em negrito e maiúsculo
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
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <Text style={styles.header}>
        Treino - 
        <Text style={styles.alunoName}> {route.params.aluno.nome_aluno}</Text>
      </Text>      
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Segunda-feira:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.segunda)}</Text>
      </View>
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Terça-feira:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.terca)}</Text>
      </View>
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Quarta-feira:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.quarta)}</Text>
      </View>
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Quinta-feira:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.quinta)}</Text>
      </View>
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Sexta-feira:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.sexta)}</Text>
      </View>
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Sábado:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.sabado)}</Text>
      </View>
      <View style={styles.diaContainer}>
        <Text style={styles.diaLabel}>Domingo:</Text>
        <Text style={styles.exercicios}>{formatTreino(treino.domingo)}</Text>
      </View>
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
  grupoMuscular: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default TreinoScreen;
