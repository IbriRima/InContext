import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import MapScreen   from './screens/MapScreen';
import ChatScreen  from './screens/ChatScreen';

/* ------------------------------------------------------------------ */
/* 🔑 All route names and params in one place                          */
/* ------------------------------------------------------------------ */
export type RootStackParamList = {
  Login: undefined;
  Map:   undefined;
  Chat:  { place: string };   // adjust if Chat takes different params
};

/* ------------------------------------------------------------------ */
/* 🔧 Stack navigator typed with the param list                        */
/* ------------------------------------------------------------------ */
const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,   // hide headers globally (optional)
};

/* ------------------------------------------------------------------ */
/* 🚀 App root component                                              */
/* ------------------------------------------------------------------ */
export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map"   component={MapScreen}   />
        <Stack.Screen name="Chat"  component={ChatScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
