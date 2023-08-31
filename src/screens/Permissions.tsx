import React from 'react';
import { useRookAHPermissions } from 'react-native-rook_ah';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../hooks';
import { styles } from '../theme/styles/style';

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
    </View>
  );
};
