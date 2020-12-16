import React from 'react';
import codePush from 'react-native-code-push';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';

import store, {persistor} from './src/redux/store';
import RootContainer from './src/components/RootContainer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
          <RootContainer />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(App);

// Andrioid
// shopsol.master-gmail.com/shopsolWesop-android
// appcenter codepush release-react -a shopsol.master-gmail.com/shopsolWesop-android -d Production
// appcenter codepush deployment list -a shopsol.master-gmail.com/shopsolWesop-android -k
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ IQ-khtu0aKK5BdIbO4km_EtFgAQjWBnmiq-T6 │
// └────────────┴───────────────────────────────────────┘

// iOS
// shopsol.master-gmail.com/shopsolWesop-ios
// appcenter codepush release-react -a shopsol.master-gmail.com/shopsolWesop-ios -d Production
// appcenter codepush deployment list -a shopsol.master-gmail.com/shopsolWesop-ios -k
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ KJJ3ieWUWc4o6dSzHZxZXdSayNHMvsvlC9U6y │
// └────────────┴───────────────────────────────────────┘
