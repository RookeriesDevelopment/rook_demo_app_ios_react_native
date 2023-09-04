import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { styles } from '../theme/styles/style';
import { PhysicalTransmission } from '../components/PhysicalTransmission';
import { useUser } from '../hooks/useUser';

export const PhysicalTransmissionScreen = () => {
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
      {userID && <PhysicalTransmission date={date} userID={userID} />}
    </ScrollView>
  );
};
