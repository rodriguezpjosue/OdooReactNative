import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import Odoo from '../services/OdooServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/Styles';

function LoginForm({ navigation }) {
    const [loginMessage, setLoginMessage] = useState('');
    const { register, setValue, getValues, handleSubmit, control, reset, formState: { errors } } = useForm();

    const [isUsernameFilled, setIsUsernameFilled] = useState(false);
    const [isPasswordFilled, setIsPasswordFilled] = useState(false);

    const handleUsernameChange = (value) => {
        setIsUsernameFilled(!!value);
    };

    const handlePasswordChange = (value) => {
        setIsPasswordFilled(!!value);
    };

    const onLogin = async (data) => {
        setLoginMessage('');

        data.host = await AsyncStorage.getItem('configHost');
        data.port = await AsyncStorage.getItem('configPort');
        data.database = await AsyncStorage.getItem('configDatabase');

        if (data.host && data.port && data.database) {
          //data.host = "http://app-test.sgsdominion-global.com";
          //data.database = "co-lr-test";

          const odoo = new Odoo({
              host: data.host,
              port: data.port, /* Defaults to 80 if not specified */
              database: data.database,
              username: data.username, /* Optional if using a stored session_id */
              password: data.password, /* Optional if using a stored session_id */
              //session_id: 'YOUR_SESSION_ID', /* Optional if using username/password */
              //context : 'Your_Context', /* Optional Like Change Language */
            });
          
          const loginCallback = (error, result) => {
              if (error === null){
                  navigation.navigate('Dashboard');
              } else {
                  reset(control);
                  //console.log(result);
                  setIsUsernameFilled(false);
                  setIsPasswordFilled(false);
                  //setValue('username','popo');
                  setLoginMessage(error.data.message);
              }
          }
          
          odoo.authenticate(loginCallback)
              .then(response => { 
                  //console.log(response);
              })
              .catch(e => { 
                  console.error('Not controlled error:', e);
              });

        } else {
          if (data.database === null || data.database === undefined){
            reset(control);
            setIsUsernameFilled(false);
            setIsPasswordFilled(false);
            setLoginMessage('No database defined');
            return;
          }

          if (data.host === null || data.host === undefined){
            reset(control);
            setIsUsernameFilled(false);
            setIsPasswordFilled(false);
            setLoginMessage('No host defined');
            return;
          }

          if (data.port === null || data.port === undefined){
            reset(control);
            setIsUsernameFilled(false);
            setIsPasswordFilled(false);
            setLoginMessage('No port defined');
            return;
          }
        }
    };

  return (
    <SafeAreaView style={styles.centerPage}>
        <Text style={styles.errorText}>{ loginMessage }</Text>
      <View style={styles.container}>
        {/* Comentarios */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={
                    value => {
                        onChange(value);
                        handleUsernameChange(value);
                    }
                }
                placeholder="Username"
                value={value}
            />
          )}
          name="username"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={
                    value => {
                        onChange(value);
                        handlePasswordChange(value);
                    }
                }
                placeholder="Password"
                value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <Button 
            title="Login" 
            onPress={handleSubmit(onLogin)} 
            disabled={!isUsernameFilled || !isPasswordFilled}
        />

        <Button
            title="Go to Settings"
            onPress={() => navigation.navigate('Settings')}
        />

      </View>
    </SafeAreaView>
  );
}

export default LoginForm;