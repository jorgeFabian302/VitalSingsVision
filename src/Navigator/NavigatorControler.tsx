import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { CreateCountScreen } from '../Screens/CreateCountScreen';
import { LoginScreen } from '../Screens/LoginScreen';
import { HomeScreen } from '../Screens/HomeScreen';
import { PruebaScreen } from '../Screens/PruebaScreen';


export type RootStackParams = {
  CreateCountScreen : undefined,
  HomeScreen:  {userId: string, Tipo: string},
  LoginScreen: undefined,
  PruebaScreen: undefined,  
}

const Stack = createStackNavigator<RootStackParams>();

export const NavigatorControler = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name = "LoginScreen" component={ LoginScreen } />
      <Stack.Screen name = "CreateCountScreen" component={ CreateCountScreen } />
      <Stack.Screen name = "HomeScreen" component={ HomeScreen } />
    </Stack.Navigator>
  );
}