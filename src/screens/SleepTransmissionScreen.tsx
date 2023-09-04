import React, { useEffect, useState } from 'react';
import { TextInput, ScrollView } from 'react-native';
import { styles } from '../theme/styles/style';
import { useUser } from '../hooks/useUser';
import { SleepTransmission } from '../components/SleepTransmission';

export const SleepTransmissionScreen = () => {
  const [date, setDate] = useState('');
  const [userID, setUserID] = useState('');

  const { checkUserID } = useUser();

  useEffect(() => {
    checkUserID()
      .then(id => setUserID(id))
      .catch(console.log);
  }, []);

  return (
    <ScrollView style={styles.bg}>
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="YYYY-MM-DD"
        onChangeText={text => setDate(text)}
      />
      {userID && <SleepTransmission date={date} userID={userID} />}
    </ScrollView>
  );
};
