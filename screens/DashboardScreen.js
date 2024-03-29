import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import styles from '../assets/Styles';

const Dashboard = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.centerPage}>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </SafeAreaView>
    )
}

export default Dashboard;