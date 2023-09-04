import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { styles } from '../theme/styles/style';
import { EventsTransmission } from '../components';
import { useUser } from '../hooks/useUser';

export const EventsTransmissionScreen = () => {
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
        placeholder="YYYY-MM-DD"
        placeholderTextColor="white"
        onChangeText={text => setDate(text)}
      />

      {userID && <EventsTransmission date={date} userID={userID} />}
    </ScrollView>
  );
};
