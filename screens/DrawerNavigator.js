import * as React from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import DrawerMenu from '../navigation/DrawerItems';
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsForm';
import LoginScreen from './LoginForm';

const NavigationDrawer = (props) => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerType="front"
            initialRouteName={props.isLogin ? "Dashboard" : "Login"}
            drawerContent={(props) => <DrawerMenu{...props} />}
            screenOptions={{
              activeTintColor: '#e91e63',
              itemStyle: { marginVertical: 10 },
            }}
        >
            <Drawer.Screen name="Dashboard" component={ DashboardScreen } />
            <Drawer.Screen name="Settings" component={ SettingsScreen } />
            <Drawer.Screen 
                name="Login" 
                component={ LoginScreen } 
                options={{
                    headerLeft: ()=> null,
                    headerBackVisible: false,
                    swipeEnabled: false,
                }}
                />
        </Drawer.Navigator>
    )
  }

  export default NavigationDrawer;