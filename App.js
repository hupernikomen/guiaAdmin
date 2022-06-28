
import React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AuthProvider from './src/contextos/auth';
import Routes from './src/routes';

export default function App() {

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <NavigationContainer
      theme={navTheme}>
      <AuthProvider>
        <StatusBar
          hidden={false}
          translucent={false}
          backgroundColor={'#b22'}
          barStyle={'light-content'} />

        <Routes />

      </AuthProvider>
    </NavigationContainer>

  )
}
