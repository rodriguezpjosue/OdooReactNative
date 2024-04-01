import * as React from 'react';
import { Logout } from '../services/Session';
import { CommonActions } from '@react-navigation/native';

const menuList = [
        {
            name: "Descargar Zona",
            label: "Descargar Zona",
            screen: "DescargarZonas",
            isScreen: false,
            onPress: (props) => console.log('Descargar Zona pressed'),
        },
        {
            name: "Settings",
            label: "Settings",
            screen: "SettingsScreen",
            isScreen: true,
            onPress: (props) => {
                console.log(this);
            },
        },
        {
            name: "Logout",
            label: "Logout",
            isScreen: false,
            onPress: (props) => {
                Logout();
                return props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Login' }]
                    })
                  );
            },
        }
    ];

export default menuList;