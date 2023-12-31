import { Link } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../theme/styles/style';

const Example = () => {
  return (
    <SafeAreaView style={[styles.bg, styles.container]}>
      <View style={styles.button}>
        <Link to={{ screen: 'Permissions' }}>
          <Text style={styles.buttonText}>Permissions</Text>
        </Link>
      </View>

      <View style={styles.button}>
        <Link to={{ screen: 'Body' }}>
          <Text style={styles.buttonText}>Body</Text>
        </Link>
      </View>
      <View style={styles.button}>
        <Link to={{ screen: 'Physical' }}>
          <Text style={styles.buttonText}>Physical</Text>
        </Link>
      </View>
      <View style={styles.button}>
        <Link to={{ screen: 'Sleep' }}>
          <Text style={styles.buttonText}>Sleep</Text>
        </Link>
      </View>
      <View style={styles.button}>
        <Link to={{ screen: 'Events' }}>
          <Text style={styles.buttonText}>Events</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Example;
