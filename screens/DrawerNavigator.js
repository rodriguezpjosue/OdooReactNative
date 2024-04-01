import * as React from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import DrawerMenu from '../navigation/DrawerItems';
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsForm';

const NavigationDrawer = () => {
    console.log('DrawerNavigator');
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerType="front"
            initialRouteName="Dashboard"
            drawerContent={(props) => <DrawerMenu{...props} />}
            screenOptions={{
              activeTintColor: '#e91e63',
              itemStyle: { marginVertical: 10 },
            }}
        >
            <Drawer.Screen name="Dashboard" component={ DashboardScreen } />
            <Drawer.Screen name="Settings" component={ SettingsScreen } />
        </Drawer.Navigator>
    )
  }

  export default NavigationDrawer;