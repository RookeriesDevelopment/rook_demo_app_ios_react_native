import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../hooks';
import { useRookAHPhysical } from 'react-native-rook_ah';
import object2Map from '../utils/object2Map';
import JSONTree from 'react-native-json-tree';

export const Physical = () => {
  const [date, setDate] = useState('');
  const [data, setData] = useState<string | Map<string, any>>('');

  const { Fonts, Gutters } = useTheme();

  const { ready, getLastExtractionDateOfPhysical, getPhysicalSummary } =
    useRookAHPhysical();

  const onLastDate = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfPhysical();
      setData(response);
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const onPhysicalSummary = async (): Promise<void> => {
    try {
      const response = await getPhysicalSummary(date);
      setData(object2Map(response));
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  return ready ? (
    <View>
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
      <Button title="Get Body Summary" onPress={onPhysicalSummary} />

      <JSONTree data={data} />
    </View>
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
