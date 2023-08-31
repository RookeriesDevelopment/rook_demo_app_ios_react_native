import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../hooks';
import { useRookAHBody } from 'react-native-rook_ah';
import object2Map from '../utils/object2Map';
import JSONTree from 'react-native-json-tree';
import { styles as global } from '../theme/styles/style';
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

      <TouchableWithoutFeedback onPress={onLastDate}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Last Date</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onBodySummary}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Get Body Summary</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.json}>
        <JSONTree data={data} />
      </View>
    </ScrollView>
  ) : (
    <Text>Loading</Text>
  );
};

const styles = StyleSheet.create({
  ...global,
  input: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'white',
    marginHorizontal: '5%',
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
});
