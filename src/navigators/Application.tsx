import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useTheme } from '../hooks';
import {
  Body,
  Events,
  Example,
  Permissions,
  Sleep,
  Home,
  TransmissionOptions,
  BodyTransmissionScreen,
  PhysicalTransmissionScreen,
  SleepTransmissionScreen,
  EventsTransmissionScreen,
} from '../screens';
import { Physical } from '../screens/Physical';

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Extraction" component={Example} />
          <Stack.Screen name="Permissions" component={Permissions} />
          <Stack.Screen name="Sleep" component={Sleep} />
          <Stack.Screen name="Body" component={Body} />
          <Stack.Screen name="Physical" component={Physical} />
          <Stack.Screen name="Events" component={Events} />

          <Stack.Screen name="Transmission" component={TransmissionOptions} />

          <Stack.Screen
            name="Body Transmission"
            component={BodyTransmissionScreen}
          />

          <Stack.Screen
            name="Physical Transmission"
            component={PhysicalTransmissionScreen}
          />

          <Stack.Screen
            name="Sleep Transmission"
            component={SleepTransmissionScreen}
          />

          <Stack.Screen
            name="Events Transmission"
            component={EventsTransmissionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
