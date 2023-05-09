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
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <RookConnectProvider
          keys={{
            clientUUID: '9593d0ec-47c1-4477-a8ce-10d3f4f43127',
            apiURL: 'https://api.rook-connect.dev',
            password: 'YR9GoQ3mP0zey5nZ9w3WHQMvtvFvMdnefblx',
          }}
        >
          <ApplicationNavigator />
        </RookConnectProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
