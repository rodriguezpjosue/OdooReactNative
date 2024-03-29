import * as React from 'react';
import { useState } from 'react';
import { OdooLogin } from './services/Login';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios'; // Import Axios
import Odoo from 'odoo-react'


function LoginForm() {
    const [loginResult, setLoginResult] = useState('');
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();


    const onLogin = (data) => {
        data.host = "http://app-test.sgsdominion-global.com";
        data.database = "co-lr-test";

        const odoo = new Odoo({
            host: data.host,
            port: 8069, /* Defaults to 80 if not specified */
            database: data.database,
            username: data.username, /* Optional if using a stored session_id */
            password: data.password, /* Optional if using a stored session_id */
            //session_id: 'YOUR_SESSION_ID', /* Optional if using username/password */
            //context : 'Your_Context', /* Optional Like Change Language */
          });
        
        const callback = (error, result) => {
            if (error === null){
                console.log(result);
            } else {
                console.error(error.data.message);
                setLoginResult(error.data.message);
            }
        }
        
        odoo.authenticate(callback)
            .then(response => { 
                //console.log(response);
             })
            .catch(e => { 
                console.error('Not controlled error:', e);
            });
    };

  return (
    <SafeAreaView style={styles.centerPage}>
        <Text>{ loginResult }</Text>
      <View style={styles.container}>
        {/* Form Girdileri */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
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
                onChangeText={value => onChange(value)}
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
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    centerPage:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    container: {
        padding: 16,
        alignSelf: 'stretch',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginForm;