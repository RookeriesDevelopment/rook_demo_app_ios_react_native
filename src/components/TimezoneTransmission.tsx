import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useRookAHConfiguration } from 'react-native-rook-ios-transmission';
import { styles as global } from '../theme/styles/style';

type TimezoneTransmissionProps = {
  userID: string;
};

export const TimezoneTransmission: FC<TimezoneTransmissionProps> = ({
  userID,
}) => {
  const [timezone, setTimezone] = useState('');
  const [offset, setOffset] = useState('');

  const { uploadUserTimezone } = useRookAHConfiguration({
    userID,
  });

  const handleButtonPress = async () => {
    if (isNaN(Number(offset))) {
      return;
    }

    try {
      await uploadUserTimezone({
        timezone,
        offset: Number(offset),
      });

      Alert.alert('Success', 'Changed successfully', [{ text: 'OK' }]);
    } catch (error) {
      Alert.alert('Error', 'An error occurs', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.mb}>
      <Text style={styles.label}>Timezone:</Text>
      <View style={styles.json}>
        <TextInput
          style={styles.whiteText}
          placeholderTextColor="white"
          placeholder="Timezone (ejemplo: Europe/Madrid)"
          onChangeText={setTimezone}
          value={timezone}
        />
      </View>
      <Text style={styles.label}>Offset:</Text>
      <View style={styles.json}>
        <TextInput
          style={styles.whiteText}
          placeholderTextColor="white"
          placeholder="-6"
          onChangeText={setOffset}
          value={offset}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleButtonPress}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Change User timezone</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ...global,
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginHorizontal: '5%',
  },
  mb: {
    marginVertical: 10,
  },
});
