import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../hooks';
import { useRookAHSleep } from 'react-native-rook_ah';
import object2Map from '../utils/object2Map';
import JSONTree from 'react-native-json-tree';
import { useUser } from '../hooks/useUser';
import { SleepTransmission } from '../components';

export const Sleep = () => {
  const [userID, setUserID] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState<string | Map<string, any>>('');

  const { Fonts, Gutters } = useTheme();

  const { ready, getLastExtractionDateOfSleep, getSleepSummary } =
    useRookAHSleep();

  const user = useUser({ user: 'example@example.com' });

  useEffect(() => {
    user
      .checkUserID()
      .then(id => setUserID(id))
      .catch(console.log);
  }, [user.ready]);

  const onLastDate = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfSleep();
      setData(response);
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const onSleepSummary = async (): Promise<void> => {
    try {
      const response = await getSleepSummary(date);
      setData(object2Map(response));
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  return ready ? (
    <ScrollView>
      <Text
        style={[
          Fonts.textPrimary,
          Fonts.textBold,
          Fonts.textRegular,
          Fonts.textCenter,
          Gutters.smallTMargin,
          Gutters.smallBMargin,
        ]}
      >
        Sleep
      </Text>

      <TextInput
        placeholder="yyyy-mm-dd"
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
      />
      <Button title="Last Date" onPress={onLastDate} />
      <Button title="Get Sleep Summary" onPress={onSleepSummary} />

      {userID && (
        <SleepTransmission
          userID={userID}
          setData={queue => setData(queue)}
          date={date}
        />
      )}

      <JSONTree data={data} />
    </ScrollView>
  ) : (
    <Text>Loading</Text>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: '5%',
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
});
