import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import LoginScreen from './LoginForm';
import SettingsScreen from './SettingsForm';
import DashboardScreen from './DashboardScreen';
import { Session } from '../services/Session';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    const [initialRouteName, setInitialRouteName] = useState('Login');

    const session = Session();
    
    useEffect(() => {
        if (session === null || session === undefined) {
            setInitialRouteName('Login');
        } else {
            setInitialRouteName('Dashboard')
        }
      },[session]);

    return (
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
    )
}

export default LoginStack;