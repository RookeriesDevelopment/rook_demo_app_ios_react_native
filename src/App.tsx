import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import ApplicationNavigator from './navigators/Application';
import { RookConnectProvider } from 'rook_auth';
import './translations';
import { credentials } from './utils/credentials';

const App = () => {
  return (
    <RookConnectProvider
      keys={{
        clientUUID: credentials.uuid,
        environment: 'sandbox',
        password: credentials.password,
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
    </RookConnectProvider>
  );
};

export default App;
