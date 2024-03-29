import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import Odoo from '../services/OdooServices'


function LoginForm() {
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

    const onLogin = (data) => {
        setLoginMessage('');

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
        
        const loginCallback = (error, result) => {
            if (error === null){
                console.log(result);
            } else {
                reset(control);
                setIsUsernameFilled(false);
                setIsPasswordFilled(false);
                //setValue('username','popo');
                console.error(error.data.message);
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