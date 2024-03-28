import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { CreateCountScreen } from '../Screens/CreateCountScreen';
import { LoginScreen } from '../Screens/LoginScreen';
import { HomeScreen } from '../Screens/HomeScreen';
import { Data } from '../interfaces/interfaces';


export type RootStackParams = {
  CreateCountScreen : undefined,
  HomeScreen:  { Tipo: string, User: Data},
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