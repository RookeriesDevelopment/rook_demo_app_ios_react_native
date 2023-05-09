import React, { FC } from 'react';
import { Button, View } from 'react-native';
import { useRookAHBodyTransmission } from 'react-native-rook-transmission';
import { useRookAHPermissions, useRookAHBody } from 'react-native-rook_ah';
import object2Map from '../utils/object2Map';

type BodyTransmissionProps = {
  userID: string;
  date: string;
  setData: (data: string | Map<string, any>) => void;
};

export const BodyTransmission: FC<BodyTransmissionProps> = ({
  userID,
  date,
  setData,
}) => {
  const { enqueueBodySummary, getBodySummariesStored, uploadBodySummaries } =
    useRookAHBodyTransmission({
      userID,
    });
  const { requestBodyPermissions } = useRookAHPermissions();
  const { getBodySummary } = useRookAHBody();

  const requestPermission = async (): Promise<void> => {
    await requestBodyPermissions();
  };

  const handleEnqueueSleep = async (): Promise<void> => {
    try {
      const summary = await getBodySummary(date);
      await enqueueBodySummary(date, summary);
      setData('Summary saved');
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const handleGetQueue = async (): Promise<void> => {
    try {
      const result = await getBodySummariesStored();
      setData(object2Map(result));
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const handleUploadQueue = async (): Promise<void> => {
    try {
      const result = await uploadBodySummaries();
      setData(`Queue uploaded: ${result}`);
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  return (
    <View>
      <Button title="Request Body permissions" onPress={requestPermission} />
      <Button title="Enqueue Body summary" onPress={handleEnqueueSleep} />
      <Button title="Get Enqueue" onPress={handleGetQueue} />
      <Button title="Upload Enqueue" onPress={handleUploadQueue} />
    </View>
  );
};
