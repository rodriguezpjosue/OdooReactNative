import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getSession, Logout } from './services/Session';
import { useState, useEffect } from 'react';
import DrawerNavigator from './screens/DrawerNavigator';
import LoginStack from './screens/LoginStack';

function App() {
  const [isLogin, setLogin] = useState(false);
  const session = getSession();
  useEffect(() => {
    session
        .then(
            (response) => {
                const session = JSON.parse(response);
                if ( session ){
                  if ( session.session_id === null || session.session_id === undefined ) {
                      setLogin(false);
                  } else {
                      setLogin(true);
                  }
                }
            }
        )
        .catch(
            (response) => {
                console.log('Error: ' + response);
                killSession();
            }
        )
    },[isLogin]);

  return (
    <NavigationContainer>
      {/*isLogin ? <DrawerNavigator/> : <LoginStack/>*/}
      <DrawerNavigator isLogin={isLogin}/>
    </NavigationContainer>
  );
}

export default App;