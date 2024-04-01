import * as React from 'react';

const menuList = [
        {
            name: "Descargar Zona",
            label: "Descargar Zona",
            screen: "DescargarZonas",
            isScreen: false,
            onPress: () => console.log('Descargar Zona pressed'),
        },
        {
            name: "Settings",
            label: "Settings",
            screen: "SettingsScreen",
            isScreen: true,
            onPress: () => {
                console.log(this);
            },
        }
    ];

export default menuList;