import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const IndexScreen: React.FC = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  // Carrega a fonte
  const loadFont = async () => {
    await Font.loadAsync({
      'CorporateSBold': require('../../../assets/fonts/CorporateSBold.otf'),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFont();
    const timer = setTimeout(() => {
      navigation.navigate('InicioScreen');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {fontLoaded && (
        <Text style={styles.text}>
          <Text style={styles.textBlue}>HIPERTROF</Text>
          <Text style={styles.textOrange}>.IA</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#120f25',
    padding: 20,
  },
  text: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textBlue: {
    fontSize: 60,
    fontFamily: 'CorporateSBold', 
    color: '#fff',
    textShadowColor: '#D3D3D3',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
  textOrange: {
    fontSize: 60,
    fontFamily: 'CorporateSBold', 
    color: '#FFA000',
    textShadowColor: '#D3D3D3',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
});

export default IndexScreen;
