import React, { FC, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useRookAHPhysicalTransmission } from 'react-native-rook-ios-transmission';
import { useRookAHPermissions, useRookAHPhysical } from 'react-native-rook_ah';
import { styles } from '../theme/styles/style';
import { useTheme } from '../hooks';

type PhysicalTransmissionProps = {
  userID: string;
  date: string;
};

export const PhysicalTransmission: FC<PhysicalTransmissionProps> = ({
  userID,
  date,
}) => {
  const [response, setResponse] = useState('');

  const { Fonts, Gutters } = useTheme();

  const {
    enqueuePhysicalSummary,
    getPhysicalSummariesStored,
    uploadPhysicalSummaries,
  } = useRookAHPhysicalTransmission({
    userID,
  });
  const { requestPhysicalPermissions } = useRookAHPermissions();
  const { getPhysicalSummary } = useRookAHPhysical();

  const requestPermission = async (): Promise<void> => {
    await requestPhysicalPermissions();
  };

  const handleEnqueuePhysical = async (): Promise<void> => {
    try {
      const summary = await getPhysicalSummary(date);
      await enqueuePhysicalSummary(summary);
      setResponse('Summary saved');
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleGetQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const result = await getPhysicalSummariesStored();
      setResponse(`The queue has: ${result.length} queued`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  const handleUploadQueue = async (): Promise<void> => {
    try {
      setResponse('Loading...');
      const result = await uploadPhysicalSummaries();
      setResponse(`Queue uploaded: ${result}`);
    } catch (error) {
      setResponse(`${error}`);
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={requestPermission}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Request Physical permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleEnqueuePhysical}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Enqueue Physical summary</Text>
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
