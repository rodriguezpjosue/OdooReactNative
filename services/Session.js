import Odoo from './OdooServices'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Session = () => {
    return Odoo.session
}

export const Logout = () => {
    return Odoo.logout;
}

export const SetSession = (sessionData) => {
    AsyncStorage.setItem('sessionData', JSON.stringify(sessionData));
    return sessionData;
}

export const killSession = (sessionId) => {
    return;
}