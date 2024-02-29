import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { CreateCountScreen } from '../Screens/CreateCountScreen';
import { HomeScreenDoctor } from '../Screens/HomeScreenDoctor';
import { HomeScreenFamiliar } from '../Screens/HomeScreenFamiliar';
import { HomeScreenPatient } from '../Screens/HomeScreenPatient';
import { LoginScreen } from '../Screens/LoginScreen';


export type RootStackParams = {
  CreateCountScreen : undefined,
  HomeScreenDoctor: undefined,
  HomeScreenFamiliar: undefined,
  HomeScreenPatient: undefined,
  LoginScreen: undefined,  
}

const Stack = createStackNavigator<RootStackParams>();

export const NavigatorControler = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name = "HomeScreenPatient" component={ HomeScreenPatient } />
      <Stack.Screen name = "CreateCountScreen" component={ CreateCountScreen } />
      <Stack.Screen name = "LoginScreen" component={ LoginScreen } />  
      <Stack.Screen name = "HomeScreenDoctor" component={ HomeScreenDoctor } />
      <Stack.Screen name = "HomeScreenFamiliar" component={ HomeScreenFamiliar } />
      

    </Stack.Navigator>
  );
}