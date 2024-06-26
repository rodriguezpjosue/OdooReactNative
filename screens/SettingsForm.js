import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/Styles';

const SettingsForm = ({ navigation }) => {
    const { register, setValue, getValues, handleSubmit, control, reset, formState: { errors } } = useForm();

    const [resultMessage, setResultMessage] = useState('');
    const [isHostFilled, setIsHostFilled] = useState(false);
    const [isPortFilled, setIsPortFilled] = useState(false);
    const [isDatabaseFilled, setIsDatabaseFilled] = useState(false);

    const handlePortChange = (value) => {
        setIsPortFilled(!!value);
    };

    const handleHostChange = (value) => {
        setIsHostFilled(!!value);
    };

    const handleDatabaseChange = (value) => {
        setIsDatabaseFilled(!!value);
    };

    const onSaveSettings = (data) => {
        setResultMessage('');
        if (data.port && data.host && data.database) {
            AsyncStorage.setItem('configHost', data.host);
            AsyncStorage.setItem('configPort', data.port);
            AsyncStorage.setItem('configDatabase', data.database);
            setResultMessage('Settings are saved.');
        }
    }

    useEffect(() => {
        const getSettings = async () => {
            await AsyncStorage.getItem('configHost')
                .then(
                    value => setValue("host", value)
                );
            await AsyncStorage.getItem('configPort')
                .then(
                    value => setValue("port", value)
                );
            await AsyncStorage.getItem('configDatabase')
                .then(
                    value => setValue("database", value)
                );
        }
        getSettings();
    },[]);

    return (
        <SafeAreaView style={styles.centerPage}>
            <Text style={styles.errorText}>{ resultMessage }</Text>
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
                                    handleHostChange(value);
                                }
                            }
                            placeholder="Host"
                            value={value}
                        />
                    )}
                    name="host"
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
                                    handlePortChange(value);
                                }
                            }
                            placeholder="Port"
                            value={value}
                        />
                    )}
                    name="port"
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
                                    handleDatabaseChange(value);
                                }
                            }
                            placeholder="Database"
                            value={value}
                        />
                    )}
                    name="database"
                    rules={{ required: true }}
                />

                <TouchableOpacity
                    onPress={handleSubmit(onSaveSettings)} 
                    disabled={!isHostFilled || !isPortFilled || !isDatabaseFilled}
                    >
                    <Text style={styles.formButton}>
                        Save
                    </Text>
                </TouchableOpacity>
                

                <Button
                    style={styles.formButton}
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
                />

            </View>
        </SafeAreaView>
    )
}

export default SettingsForm;