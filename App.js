import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

//screens
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Interventions from './screens/Interventions';
import Registrations from './screens/Registrations';
import Services from './screens/Services';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

{/* Add Drawer.Navigation to a function.*/}
function Root() {
  return (
    <Drawer.Navigator initialRouteName='Odjavi se' >
      <Drawer.Screen name="Početna" component={Welcome} />
      <Drawer.Screen name="Registracije" component={Registrations} />
      <Drawer.Screen name="Servisi" component={Services} />
      <Drawer.Screen name="Intervencije" component={Interventions} />
      <Drawer.Screen name="Odjavi se" component={Login} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Root" component={Root} 
        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
