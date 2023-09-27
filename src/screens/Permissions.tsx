import React, { useState } from 'react';
import { useRookAHPermissions } from 'react-native-rook_ah';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../hooks';
import { styles } from '../theme/styles/style';

export const Permissions = () => {
  const [timezone, setTimezone] = useState('');

  const { Fonts, Gutters } = useTheme();

  const {
    requestSleepPermissions,
    requestPhysicalPermissions,
    requestBodyPermissions,
    requestAllPermissions,
    getUserTimeZone,
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

  const onTimezone = async (): Promise<void> => {
    const r = await getUserTimeZone();
    setTimezone(JSON.stringify(r));
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={onSleepPermissions}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Sleep Permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onPhysicalPermissions}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Physical Permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onBodyPermissions}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Body Permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onAllPermissions}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>All Permissions</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onTimezone}>
        <View style={styles.buttonTouch}>
          <Text style={styles.buttonText}>Get TimeZone</Text>
        </View>
      </TouchableWithoutFeedback>

      <Text style={[Fonts.textCenter, Fonts.textPrimary, Gutters.smallTMargin]}>
        {timezone}
      </Text>
    </View>
  );
};
