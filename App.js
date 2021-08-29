import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import Main from './src/pages/Main/index.js';
import {store} from './src/store/index.js';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
