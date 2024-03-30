import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginForm';
import SettingsScreen from './screens/SettingsForm';
import DashboardScreen from './screens/DashboardScreen';
import session from './services/checkSession';

const Stack = createNativeStackNavigator();

function App() {

  const [initialRouteName, setInitialRouteName] = useState('Login');

  useEffect(() => {
    if (session === null) {
      setInitialRouteName('Login')
    } else {
      setInitialRouteName('Dashboard')
    }
  },[session]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ initialRouteName }>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{
            headerLeft: ()=> null,
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;