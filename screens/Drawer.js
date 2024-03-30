import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginForm';
import SettingsScreen from './SettingsForm';
import DashboardScreen from './DashboardScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {
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
}

function MyDrawer() {
    return (
      <Drawer.Navigator  drawerContent={(props) => null}  screenOptions={{
         title:'',
        }} >
        <Drawer.Screen name="AppStack" component={AppStack}     />
        
      </Drawer.Navigator>
    );
  }

export default MyDrawer;
