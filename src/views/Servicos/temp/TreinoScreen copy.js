import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const TreinoScreen = () => {
  // Treinos fictícios para cada dia da semana
  const treinos = [
    { dia: 'Segunda-feira', treino: 'Treino de pernas' },
    { dia: 'Terça-feira', treino: 'Treino de peito e tríceps' },
    { dia: 'Quarta-feira', treino: 'Treino de costas e bíceps' },
    { dia: 'Quinta-feira', treino: 'Treino de ombros e trapézio' },
    { dia: 'Sexta-feira', treino: 'Treino de abdominais' },
    { dia: 'Sábado', treino: 'Descanso' },
    { dia: 'Domingo', treino: 'Descanso' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {treinos.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.diaText}>{item.dia}</Text>
            <Text style={styles.treinoText}>{item.treino}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120f25',
    padding: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '90%',
  },
  diaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  treinoText: {
    fontSize: 16,
  },
});

export default TreinoScreen;
