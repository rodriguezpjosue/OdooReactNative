import Odoo from './OdooServices'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSession = () => {
    return AsyncStorage.getItem('configSession');
}

export const Logout = () => {
    return killSession();
}

export const setSession = (sessionData) => {
    AsyncStorage.setItem('configSession', JSON.stringify(sessionData));
    return sessionData;
}

export const killSession = () => {
    AsyncStorage.removeItem('configSession');
    return;
}