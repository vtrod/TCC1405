import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ["12/03/24", "12/04/24"],
  datasets: [
    {
      data: [65, 67],
    },
  ],
};

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const DashboardScreen = ({ route }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <Text style={styles.header}>
        Dashboard - 
        <Text style={styles.alunoName}> {route.params.aluno.nome_aluno}</Text>
      </Text>
      <View style={styles.separator} />
      <LineChart
        data={data}
        width={screenWidth - 32} // Adjust width to fit screen with some padding
        height={220}
        chartConfig={chartConfig}
  bezier={false} // Define para false para fazer uma linha reta
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  alunoName: {
    color: '#FFA000',
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default DashboardScreen;
