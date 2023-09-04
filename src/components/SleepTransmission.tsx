import React, { FC, useState } from 'react';
import { useRookAHSleepTransmission } from 'react-native-rook-ios-transmission';
import { useRookAHPermissions, useRookAHSleep } from 'react-native-rook_ah';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../theme/styles/style';
import { useTheme } from '../hooks';

type SleepTransmissionProps = {
  userID: string;
  date: string;
};

export const SleepTransmission: FC<SleepTransmissionProps> = ({
  userID,
  date,
}) => {
  const [response, setResponse] = useState('');

  const { Fonts, Gutters } = useTheme();

  const { saveSleepSummary, getSleepSummariesStored, uploadSleepSummaries } =
    useRookAHSleepTransmission({ userID });

  const { requestSleepPermissions } = useRookAHPermissions();

  const { getSleepSummary } = useRookAHSleep();

  const requestPermission = async (): Promise<void> => {
    await requestSleepPermissions();
  };

  const handleEnqueueSleep = async (): Promise<void> => {
    try {
      const summary = await getSleepSummary(date);
      await saveSleepSummary(summary);
      setResponse('Summary saved');
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleGetQueue = async (): Promise<void> => {
    try {
      const result = await getSleepSummariesStored();
      setResponse(`The queue has: ${result.length} queued`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleUploadQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const result = await uploadSleepSummaries();
      setResponse(`Queue uploaded: ${result}`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={requestPermission}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Request sleep permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleEnqueueSleep}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Enqueue sleep summary</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleGetQueue}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get Enqueue</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleUploadQueue}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Upload Enqueue</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.json}>
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
    </View>
  );
};
