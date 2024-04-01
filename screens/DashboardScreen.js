import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { getSession, killSession } from '../services/Session';
import styles from '../assets/Styles';

const Dashboard = ({ navigation }) => {

    useEffect(() => {
        getSession()
            .then(
                (response) => {
                    const session = JSON.parse(response);
                    if ( session.session_id === null || session.session_id === undefined ) {
                            navigation.navigate('Login');
                        }
                }
            )
            .catch(
                (response) => {
                    console.log('Error: ' + response);
                    killSession();
                }
            )
      },[navigation]);

    return (
        <SafeAreaView style={styles.centerPage}>
            <Text>Bienvenido</Text>
        </SafeAreaView>
    )
}

export default Dashboard;