import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../hooks';
import { useRookAHBody } from 'react-native-rook_ah';
import object2Map from '../utils/object2Map';
import JSONTree from 'react-native-json-tree';
import { BodyTransmission } from '../components';
import { useUser } from '../hooks/useUser';

export const Body = () => {
  const [userID, setUserID] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState<string | Map<string, any>>('');

  const { Fonts, Gutters } = useTheme();

  const { ready, getLastExtractionDateOfBody, getBodySummary } =
    useRookAHBody();

  const user = useUser({ user: 'example@example.com' });

  useEffect(() => {
    user
      .checkUserID()
      .then(id => setUserID(id))
      .catch(console.log);
  }, [user.ready]);

  const onLastDate = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfBody();
      setData(response);
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const onBodySummary = async (): Promise<void> => {
    try {
      const response = await getBodySummary(date);
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
        Body
      </Text>

      <TextInput
        placeholder="yyyy-mm-dd"
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
      />
      <Button title="Last Date" onPress={onLastDate} />
      <Button title="Get Body Summary" onPress={onBodySummary} />

      {userID && (
        <BodyTransmission
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
