import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import cartReducer from './store/reducers/cart';
import producReducer from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigation';

const rootReducer = combineReducers({
  product: producReducer,
  cart: cartReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFondLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={ fetchFonts }
        onFinish={ () => setFondLoaded(true) }
        onError={ () => {} }
      />
    );
  }

  return (
    <Provider store={ store }>
      <ShopNavigator />    
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
