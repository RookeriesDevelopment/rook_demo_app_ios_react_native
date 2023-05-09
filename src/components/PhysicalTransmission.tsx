import React, { FC } from 'react';
import { Button, View } from 'react-native';
import { useRookAHPhysicalTransmission } from 'react-native-rook-transmission';
import { useRookAHPermissions, useRookAHPhysical } from 'react-native-rook_ah';
import object2Map from '../utils/object2Map';

type PhysicalTransmissionProps = {
  userID: string;
  date: string;
  setData: (data: string | Map<string, any>) => void;
};

export const PhysicalTransmission: FC<PhysicalTransmissionProps> = ({
  userID,
  date,
  setData,
}) => {
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

  const handleEnqueueSleep = async (): Promise<void> => {
    try {
      const summary = await getPhysicalSummary(date);
      await enqueuePhysicalSummary(date, summary);
      setData('Summary saved');
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const handleGetQueue = async (): Promise<void> => {
    try {
      const result = await getPhysicalSummariesStored();
      setData(object2Map(result));
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const handleUploadQueue = async (): Promise<void> => {
    try {
      const result = await uploadPhysicalSummaries();
      setData(`Queue uploaded: ${result}`);
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  return (
    <View>
      <Button
        title="Request Physical permissions"
        onPress={requestPermission}
      />
      <Button title="Enqueue Physical summary" onPress={handleEnqueueSleep} />
      <Button title="Get Enqueue" onPress={handleGetQueue} />
      <Button title="Upload Enqueue" onPress={handleUploadQueue} />
    </View>
  );
};
