// In App.js in a new project

import React from 'react';
import { AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from './RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/Sign-in';
import Logout from './src/screens/Logout';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Feed = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" headerMode="none">
      <Drawer.Screen name="Home" options={{ drawerInactiveTintColor: 'red' }} component={Home} />
      <Drawer.Screen name="Log out"  component={Logout} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator >
          <Stack.Screen name="Sign in" component={SignIn} />
          <Stack.Screen options={{
            headerShown: false,
          }}
            name="Feed" component={Feed} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;