import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import LoginScreen from './LoginForm';
import SettingsScreen from './SettingsForm';
import DashboardScreen from './DashboardScreen';
import { getSession } from '../services/Session';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    const [initialRouteName, setInitialRouteName] = useState('Login');
    const [isLogin, setLogin] = useState(false);

    const session = getSession();
    
    useEffect(() => {
        console.info('LoginStack');
        session
            .then(
                (response) => {
                    const session = JSON.parse(response);
                    if ( session ){
                        if ( session.session_id === null || session.session_id === undefined ) {
                            setInitialRouteName('Login');
                            setLogin(true);
                        }
                    } /*else {
                        setInitialRouteName('Dashboard');
                    }*/
                }
            )
            .catch(
                (response) => {
                    console.log('Error: ' + response);
                    killSession();
                }
            )
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
            {/*<Stack.Screen 
                name="Dashboard" 
                component={DashboardScreen} 
                options={{
                headerLeft: ()=> null,
                headerBackVisible: false,
                }}
            />*/}
        </Stack.Navigator>
    )
}

export default LoginStack;