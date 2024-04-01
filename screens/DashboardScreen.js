import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import { getSession, killSession } from '../services/Session';
import styles from '../assets/Styles';

const Dashboard = ({ navigation }) => {

    const [isLogin, setLogin] = useState(false);
    const session = getSession();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, []); 

    useEffect(() => {
        session
            .then(
                (response) => {
                    const sessionData = JSON.parse(response);
                    if ( !sessionData ) {
                        setLogin(false);
                        navigation.navigate('Login');
                    } else {
                        setLogin(true);
                    }
                }
            )
            .catch(
                (response) => {
                    console.log('Error: ' + response);
                    killSession();
                    navigation.navigate('Login');
                }
            )
      },[navigation, session, isLogin]);

    return (
        <SafeAreaView style={styles.centerPage}>
            <Text>Bienvenido</Text>
        </SafeAreaView>
    )
}

export default Dashboard;