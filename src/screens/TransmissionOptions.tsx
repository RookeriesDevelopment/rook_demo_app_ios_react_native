import React from 'react';
import { Link } from '@react-navigation/native';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../theme/styles/style';
import { UpdateUserID } from '../components/UpdateUserID';

export const TransmissionOptions = () => {
  return (
    <SafeAreaView style={[styles.bg]}>
      <UpdateUserID />

      <View style={styles.json}>
        <Text style={styles.title}>Transmission Options</Text>
      </View>

      <View style={styles.button}>
        <Link to={{ screen: 'Permissions' }}>
          <Text style={styles.buttonText}>Permissions</Text>
        </Link>
      </View>

      <View style={styles.button}>
        <Link to={{ screen: 'Body Transmission' }}>
          <Text style={styles.buttonText}>Body</Text>
        </Link>
      </View>

      <View style={styles.button}>
        <Link to={{ screen: 'Physical Transmission' }}>
          <Text style={styles.buttonText}>Physical</Text>
        </Link>
      </View>
      <View style={styles.button}>
        <Link to={{ screen: 'Sleep Transmission' }}>
          <Text style={styles.buttonText}>Sleep</Text>
        </Link>
      </View>

      <View style={styles.button}>
        <Link to={{ screen: 'Events Transmission' }}>
          <Text style={styles.buttonText}>Events</Text>
        </Link>
      </View>
      <View style={styles.button}>
        <Link to={{ screen: 'Timezone Transmission' }}>
          <Text style={styles.buttonText}>Update Timezone</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};
