import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import session from '../services/checkSession';
import styles from '../assets/Styles';

const Dashboard = ({ navigation }) => {

    useEffect(() => {
        if ( session === null ){
            navigation.navigate('Login');
        }
      },[navigation]);

    return (
        <SafeAreaView style={styles.centerPage}>
            <Text>Bienvenido</Text>
        </SafeAreaView>
    )
}

export default Dashboard;