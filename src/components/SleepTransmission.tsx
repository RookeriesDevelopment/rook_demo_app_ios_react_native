import React, { FC } from 'react';
import { useRookAHSleepTransmission } from 'react-native-rook-transmission';
import { useRookAHPermissions, useRookAHSleep } from 'react-native-rook_ah';
import { Button, View } from 'react-native';
import object2Map from '../utils/object2Map';

type SleepTransmissionProps = {
  userID: string;
  date: string;
  setData: (data: string | Map<string, any>) => void;
};

export const SleepTransmission: FC<SleepTransmissionProps> = ({
  userID,
  date,
  setData,
}) => {
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
      setData('Summary saved');
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const handleGetQueue = async (): Promise<void> => {
    try {
      const result = await getSleepSummariesStored();
      setData(object2Map(result));
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  const handleUploadQueue = async (): Promise<void> => {
    try {
      const result = await uploadSleepSummaries();
      setData(`Queue uploaded: ${result}`);
    } catch (error) {
      setData(object2Map(error as object));
    }
  };

  return (
    <View>
      <Button title="Request sleep permissions" onPress={requestPermission} />
      <Button title="Enqueue sleep summary" onPress={handleEnqueueSleep} />
      <Button title="Get Enqueue" onPress={handleGetQueue} />
      <Button title="Upload Enqueue" onPress={handleUploadQueue} />
    </View>
  );
};
