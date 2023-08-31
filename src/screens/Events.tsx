import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRookAHEvents } from 'react-native-rook_ah';
import JSONTree from 'react-native-json-tree';
import object2Map from '../utils/object2Map';
import { useTheme } from '../hooks';
import { styles as global } from '../theme/styles/style';

export const Events = () => {
  const [date, setDate] = useState('');
  const [data, setData] = useState<string | Map<string, any>>('');

  const { Fonts, Gutters } = useTheme();

  const {
    ready,
    getLastExtractionDateOfActivityEvents,
    getLastExtractionDateOfBodyOxygenationEvents,
    getLastExtractionDateOfBodyHeartRateEvents,
    getLastExtractionDateOfPhysicalOxygenationEvents,
    getLastExtractionDateOfPhysicalHeartRateEvents,
    getActivityEvents,
    getBodyOxygenationEvents,
    getPhysicalOxygenationEvents,
    getBodyHeartRateEvents,
    getPhysicalHeartRateEvents,
  } = useRookAHEvents();

  const onLastDate = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfActivityEvents();
      setData(response || '');
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onLastDateOxyEvents = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfBodyOxygenationEvents();
      setData(response || '');
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onLastDateHREvents = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfBodyHeartRateEvents();
      setData(response || '');
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onLastDatePOXEvents = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfPhysicalOxygenationEvents();
      setData(response || '');
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onLastDatePHREvents = async (): Promise<void> => {
    try {
      const response = await getLastExtractionDateOfPhysicalHeartRateEvents();
      setData(response || '');
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onActEvents = async (): Promise<void> => {
    try {
      const response = await getActivityEvents(date);
      setData(object2Map(response));
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onBOE = async (): Promise<void> => {
    try {
      const response = await getBodyOxygenationEvents(date);
      setData(object2Map(response));
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onPOE = async (): Promise<void> => {
    try {
      const response = await getPhysicalOxygenationEvents(date);
      setData(object2Map(response));
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onBHR = async (): Promise<void> => {
    try {
      const response = await getBodyHeartRateEvents(date);
      setData(object2Map(response));
    } catch (error) {
      setData(`${error}`);
    }
  };

  const onPHR = async (): Promise<void> => {
    try {
      const response = await getPhysicalHeartRateEvents(date);
      setData(object2Map(response));
    } catch (error) {
      setData(`${error}`);
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
        Events
      </Text>

      <TextInput
        placeholder="yyyy-mm-dd"
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
      />

      <TouchableWithoutFeedback onPress={onLastDate}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>
            Last Extraction Date Of ActivityEvents
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLastDateOxyEvents}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>
            Last Extraction Date Of Body Oxygenation Events
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLastDateHREvents}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>
            Last Extraction Date Of Body Heart Rate Events
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLastDatePOXEvents}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>
            Last Extraction Date Of Physical Oxygenation Events
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLastDatePHREvents}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>
            Last Extraction Date Of Physical Heart Rate Events
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onActEvents}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Activity Events</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onBOE}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Body Oxygenation Events</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPOE}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Physical Oxygenation Events</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onBHR}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Body Heart Rate Events</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPHR}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Physical Heart Rate Events</Text>
        </View>
      </TouchableWithoutFeedback>

      <JSONTree data={data} />
    </ScrollView>
  ) : (
    <Text>Loading</Text>
  );
};

const styles = StyleSheet.create({
  ...global,
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
