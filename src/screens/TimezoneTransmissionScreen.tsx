import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { styles } from '../theme/styles/style';
import { useUser } from '../hooks/useUser';
import { TimezoneTransmission } from '../components/TimezoneTransmission';

export const TimezoneTransmissionScreen = () => {
  const [userID, setUserID] = useState('');

  const { checkUserID } = useUser();

  useEffect(() => {
    checkUserID()
      .then(id => setUserID(id))
      .catch(console.log);
  }, []);

  return (
    <ScrollView style={styles.bg}>
      {userID && <TimezoneTransmission userID={userID} />}
    </ScrollView>
  );
};
