import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useUser } from '../hooks/useUser';
import { styles as global } from '../theme/styles/style';

export const UpdateUserID = () => {
  const [userID, setUserID] = useState('');
  const { checkUserID, updateUser, ready } = useUser();

  useEffect(() => {
    console.log(ready);
  }, [ready]);

  useEffect(() => {
    checkUserID()
      .then(id => {
        setUserID(id);
      })
      .catch(e => {
        Alert.alert('Error', `${e}`, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      });
  }, []);

  const handleButtonPress = async (): Promise<void> => {
    if (userID.trim() === '') {
      Alert.alert('Alerta', 'Enter a valid user ID (number or string)', [
        { text: 'OK' },
      ]);
      return;
    }

    try {
      await updateUser({ user: userID });

      Alert.alert('Success', 'Changed successfully', [{ text: 'OK' }]);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', '', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.mb}>
      <Text style={styles.label}>User ID:</Text>
      <View style={styles.json}>
        <TextInput
          style={styles.whiteText}
          placeholderTextColor="white"
          placeholder="Enter userID"
          value={userID}
          onChangeText={setUserID}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleButtonPress}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Change User ID</Text>
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
