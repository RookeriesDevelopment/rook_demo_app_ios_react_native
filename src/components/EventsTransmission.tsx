import React, { FC, useState } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {
  useRookAHActivityEventsTransmission,
  useRookAHHeartRateEventsTransmission,
  useRookAHOxygenationEventsTransmission,
} from 'react-native-rook-ios-transmission';
import { useRookAHEvents } from 'react-native-rook_ah';
import { styles as Global } from '../theme/styles/style';
import { useTheme } from '../hooks';

type BodyTransmissionProps = {
  date: string;
  userID: string;
};

export const EventsTransmission: FC<BodyTransmissionProps> = ({
  date,
  userID,
}) => {
  const { Fonts, Gutters } = useTheme();
  const [response, setResponse] = useState('{}');

  const {
    getActivityEvents,
    getBodyHeartRateEvents,
    getPhysicalHeartRateEvents,
    getBodyOxygenationEvents,
  } = useRookAHEvents();

  const { enqueueActivityEvents, uploadActivityEvents, ...rest } =
    useRookAHActivityEventsTransmission({
      userID,
    });

  const {
    enqueueHeartRateEvents,
    getCountBodyHeartRateEvents,
    getCountPhysicalHeartRateEvents,
    uploadHeartRateEvents,
  } = useRookAHHeartRateEventsTransmission({
    userID,
  });

  const {
    enqueueOxygenationEvents,
    getCountBodyOxygenationEvents,
    getCountPhysicalOxygenationEvents,
    uploadOxygenationEvents,
  } = useRookAHOxygenationEventsTransmission({
    userID,
  });

  const handleEnqueueActivityEvents = async (): Promise<void> => {
    try {
      const summary = await getActivityEvents(date);
      console.log(summary[0].metadata);
      await enqueueActivityEvents(summary);
      setResponse('Activity events saved');
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleGetActivityQueue = async (): Promise<void> => {
    try {
      const results = await rest.getCountActivityEvents();
      setResponse(`The queue has: ${results} queued`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleUploadActivityQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const results = await uploadActivityEvents();
      setResponse(`Queue uploaded: ${results}`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleEnqueueHREvents = async (): Promise<void> => {
    try {
      const summary = await getPhysicalHeartRateEvents(date);
      const summary2 = await getBodyHeartRateEvents(date);

      await enqueueHeartRateEvents([...summary, ...summary2]);
      setResponse('Heart Rate events saved');
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleGetHRQueue = async (): Promise<void> => {
    try {
      const results = await getCountBodyHeartRateEvents();
      const results3 = await getCountPhysicalHeartRateEvents();

      setResponse(`The queue has: ${results + results3} queued`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleUploadHRQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const results = await uploadHeartRateEvents();
      setResponse(`Queue uploaded: ${results}`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleEnqueueOxygenationEvents = async (): Promise<void> => {
    try {
      const summary = await getBodyOxygenationEvents(date);
      await enqueueOxygenationEvents(summary);
      setResponse('Oxygenation events saved');
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleGetOxygenationQueue = async (): Promise<void> => {
    try {
      const results = await getCountBodyOxygenationEvents();
      const results3 = await getCountPhysicalOxygenationEvents();

      setResponse(`The queue has: ${results + results3} queued`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleUploadOxygenationQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const results = await uploadOxygenationEvents();
      setResponse(`Queue uploaded: ${results}`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        <TouchableWithoutFeedback onPress={handleEnqueueActivityEvents}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Enqueue Activity Events</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGetActivityQueue}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Get Queue size</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleUploadActivityQueue}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>
              Upload Enqueue Activity Events
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.row}>
        <TouchableWithoutFeedback onPress={handleEnqueueHREvents}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Enqueue HR Events</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGetHRQueue}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Get Queue size</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleUploadHRQueue}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Upload Enqueue HR Events</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.row}>
        <TouchableWithoutFeedback onPress={handleEnqueueOxygenationEvents}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Enqueue Oxygenation Events</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleGetOxygenationQueue}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>Get Queue size</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleUploadOxygenationQueue}>
          <View style={styles.cell}>
            <Text style={styles.buttonText}>
              Upload Enqueue Oxygenation Events
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

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
        {response}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...Global,
  mb: {
    marginBottom: 10,
  },
  blacked: {
    color: 'black',
  },
  gridContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 120, // Adjust the width and height as needed
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
});
