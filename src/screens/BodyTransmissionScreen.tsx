import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';

import { styles } from '../theme/styles/style';
import { BodyTransmission } from '../components/BodyTransmission';
import { useUser } from '../hooks/useUser';

export const BodyTransmissionScreen = () => {
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
      {userID && <BodyTransmission date={date} userID={userID} />}
    </ScrollView>
  );
};
