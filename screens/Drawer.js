import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();

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
