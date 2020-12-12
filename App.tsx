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
// shopsol.master-gmail.com/ShopsolWesop
// appcenter codepush release-react -a shopsol.master-gmail.com/ShopsolWesop -d Production
// appcenter codepush deployment list -a shopsol.master-gmail.com/ShopsolWesop
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Staging    │ eZ8i91DZRm_MErcWrvWsrMXzcpp3v-AiazqHI │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ ivwSWKqVV09l04m1eS2AOLe7hAyvo5VXgaoat │
// └────────────┴───────────────────────────────────────┘

// iOS
// shopsol.master-gmail.com/ShopsolWesop-1
// appcenter codepush release-react -a shopsol.master-gmail.com/ShopsolWesop-1 -d Production
// appcenter codepush deployment list -a shopsol.master-gmail.com/ShopsolWesop-1
// ┌────────────┬───────────────────────────────────────┐
// │ Name       │ Key                                   │
// ├────────────┼───────────────────────────────────────┤
// │ Staging    │ iy8-rDLfoik1pPaDhjd1iuUDlEApqhMcVmN55 │
// ├────────────┼───────────────────────────────────────┤
// │ Production │ hIYDcLdpv4thrTbH-5OU0_hTcvrviP7Y-Ayr4 │
// └────────────┴───────────────────────────────────────┘
