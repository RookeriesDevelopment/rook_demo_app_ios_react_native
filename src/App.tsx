import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import ApplicationNavigator from './navigators/Application';
import { RookConnectProvider } from 'rook_auth';
import './translations';

const App = () => {
  /*const onBeforeLift = async (): Promise<void> => {
    console.log('Resolviendo');
    await new Promise(resolve =>
      setTimeout(() => {
        console.log('Resuelto');
        resolve(true);
      }, 2000),
    );
  };*/
  return (
    <RookConnectProvider
      keys={{
        clientUUID: '9593d0ec-47c1-4477-a8ce-10d3f4f43127',
        environment: 'sandbox',
        password: 'YR9GoQ3mP0zey5nZ9w3WHQMvtvFvMdnefblx',
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
