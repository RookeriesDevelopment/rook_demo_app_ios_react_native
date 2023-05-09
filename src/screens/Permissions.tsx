import React from 'react';
import { useRookAHPermissions } from 'react-native-rook_ah';
import { Button, View, Text } from 'react-native';
import { useTheme } from '../hooks';

export const Permissions = () => {
  const { Fonts, Gutters } = useTheme();
  const {
    requestSleepPermissions,
    requestPhysicalPermissions,
    requestBodyPermissions,
    requestAllPermissions,
  } = useRookAHPermissions();

  const onSleepPermissions = async (): Promise<void> => {
    await requestSleepPermissions();
  };

  const onPhysicalPermissions = async (): Promise<void> => {
    await requestPhysicalPermissions();
  };

  const onBodyPermissions = async (): Promise<void> => {
    await requestBodyPermissions();
  };

  const onAllPermissions = async (): Promise<void> => {
    await requestAllPermissions();
  };

  return (
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
        Permissions
      </Text>
      <Button title="Sleep Permissions" onPress={onSleepPermissions} />
      <Button title="Physical Permissions" onPress={onPhysicalPermissions} />
      <Button title="Body Permissions" onPress={onBodyPermissions} />
      <Button title="All Permissions" onPress={onAllPermissions} />
    </View>
  );
};
