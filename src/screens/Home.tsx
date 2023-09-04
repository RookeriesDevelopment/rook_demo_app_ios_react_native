import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Link } from '@react-navigation/native';
import { styles } from '../theme/styles/style';

export const Home = () => {
  return (
    <SafeAreaView style={[styles.bg, styles.container]}>
      <View style={styles.button}>
        <Link to={{ screen: 'Extraction' }} style={styles.buttonText}>
          Extraction
        </Link>
      </View>
      <View style={styles.button}>
        <Link to={{ screen: 'Transmission' }} style={styles.buttonText}>
          Transmission
        </Link>
      </View>
    </SafeAreaView>
  );
};
