import React, { FC, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useRookAHBodyTransmission } from 'react-native-rook-ios-transmission';
import { useRookAHPermissions, useRookAHBody } from 'react-native-rook_ah';
import { styles } from '../theme/styles/style';
import { useTheme } from '../hooks';

type BodyTransmissionProps = {
  userID: string;
  date: string;
};

export const BodyTransmission: FC<BodyTransmissionProps> = ({
  userID,
  date,
}) => {
  const [response, setResponse] = useState('');

  const { Fonts, Gutters } = useTheme();

  const { enqueueBodySummary, uploadBodySummaries, getBodySummariesStored } =
    useRookAHBodyTransmission({
      userID,
    });
  const { requestBodyPermissions } = useRookAHPermissions();
  const { getBodySummary } = useRookAHBody();

  const requestPermission = async (): Promise<void> => {
    await requestBodyPermissions();
  };

  const handleEnqueueBody = async (): Promise<void> => {
    try {
      const summary = await getBodySummary(date);
      await enqueueBodySummary(summary);
      setResponse('Summary saved');
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleUploadQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const result = await uploadBodySummaries();
      setResponse(`Queue uploaded: ${result}`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleQueueStored = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const result = await getBodySummariesStored();
      setResponse(`The queue has: ${result.length} queued`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  return (
    <View style={styles.mt}>
      <TouchableWithoutFeedback onPress={requestPermission}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Request Body permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleEnqueueBody}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Enqueue Body summary</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleUploadQueue}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Upload Enqueue</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleQueueStored}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Stored</Text>
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
