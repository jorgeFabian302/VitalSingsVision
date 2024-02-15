import 'react-native-gesture-handler';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NavigatorControler } from './src/Navigator/NavigatorControler';


const App = () => {
  return (
    <NavigationContainer>
      <NavigatorControler />
    </NavigationContainer>
  )
}

export default App