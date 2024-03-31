import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { Session, Logout } from './services/Session';
import LoginStack from './screens/LoginStack';

function App() {

  const Drawer = createDrawerNavigator();

  const session = Session();

  const NavigationDrawer = () => {
    <Drawer.Navigator
            drawerType="front"
            initialRouteName="Dashboard"
            drawerContentOptions={{
              activeTintColor: '#e91e63',
              itemStyle: { marginVertical: 10 },
            }}
      >
        <DrawerItem
          label="Help"
          onPress={() => Logout}
        />
    </Drawer.Navigator>
  }

  return (
    <NavigationContainer>
      {session ? <NavigationDrawer/> : <LoginStack/>}
    </NavigationContainer>
  );
}

export default App;