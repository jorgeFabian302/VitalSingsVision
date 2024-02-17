import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { HomeScreen } from '../Screens/HomeScreen';
import { CreateCountScreen } from '../Screens/CreateCountScreen';


export type RootStackParams = {
  HomeScreen: undefined,
  LoginScreen: undefined,
  CreateCountScreen : undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const NavigatorControler = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name = "CreateCountScreen" component={ CreateCountScreen } />
      <Stack.Screen name = "LoginScreen" component={ LoginScreen } />  
      <Stack.Screen name = "HomeScreen" component={ HomeScreen } />
    </Stack.Navigator>
  );
}