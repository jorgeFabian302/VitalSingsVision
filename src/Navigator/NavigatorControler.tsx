import { createStackNavigator } from '@react-navigation/stack';


import { HomeScreen } from '../Screens/HomeScreen';
import { LoginScreen } from '../Screens/LoginScreen';
import { InfoUserSCreen } from '../Screens/InfoUserSCreen';
import { DiagnosisScreen } from '../Screens/DiagnosisScreen';
import { CreateCountScreen } from '../Screens/CreateCountScreen';
import { ConsultaClass, Data, Doctor, Listconsults, Paciente } from '../interfaces/interfaces';
import { InfoScreen } from '../Screens/InfoScreen';

export type RootStackParams = {
  CreateCountScreen : undefined,
  HomeScreen:  { Tipo: string, User: Data},
  LoginScreen: undefined,
  InfoUserSCreen: {User?: Data},
  DiagnosisScreen: {RevisionCardiaca?: ConsultaClass},
  InfoScreen: {UserP: Paciente, UserD: Data,  Listconsults?: Listconsults}
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
      <Stack.Screen name = "InfoUserSCreen" component={ InfoUserSCreen } />
      <Stack.Screen name = "DiagnosisScreen" component={ DiagnosisScreen } />
      <Stack.Screen name = "InfoScreen" component={ InfoScreen } />
    </Stack.Navigator>
  );
}