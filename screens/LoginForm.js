import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useIsFocused } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import Odoo from '../services/OdooServices';
import { getSession, setSession } from '../services/Session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/Styles';

function LoginForm({ navigation }) {
    const [loginMessage, setLoginMessage] = useState('');
    const { register, setValue, getValues, handleSubmit, control, reset, formState: { errors } } = useForm();

    const [isUsernameFilled, setIsUsernameFilled] = useState(false);
    const [isPasswordFilled, setIsPasswordFilled] = useState(false);

    const isFocused = useIsFocused();

    const session = getSession();

    const handleUsernameChange = (value) => {
        setIsUsernameFilled(!!value);
    };

    const handlePasswordChange = (value) => {
        setIsPasswordFilled(!!value);
    };

    useEffect(() => {
      getSession()
          .then(
              (response) => {
                  const session = JSON.parse(response);
                  if ( session.session_id === null || session.session_id === undefined ) {
                        console.info('Not login');
                      } else {
                        navigation.navigate('Dashboard');
                      }
              }
          )
    },[navigation, isFocused]);

    useEffect(() => {
      if ( session.session_id === null || session.session_id  === undefined ){
      } else {
        navigation.navigate('Dashboard');
      }
    },[navigation, isFocused]);

    const onLogin = async (data) => {
        setLoginMessage('');

        data.host = await AsyncStorage.getItem('configHost');
        data.port = await AsyncStorage.getItem('configPort');
        data.database = await AsyncStorage.getItem('configDatabase');

        if (data.host && data.port && data.database) {

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
                  setSession(result.session);
                  navigation.navigate('Dashboard');
              } else {
                  reset(control);
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