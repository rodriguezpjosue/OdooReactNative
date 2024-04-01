import React from 'react';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../assets/Styles';
import menuList from './menuList';

const CustomDrawerItem = ({ label, onPress, screen }) => {
    return (
      <DrawerItem
        label={() => (
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
        {...(onPress ? { onPress } : {})}
        {...(screen ? { screen } : {})} // Conditionally spread screen prop
      />
    );
  };

const DrawerMenu = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        {
            menuList.map(
                (menu, index) => {
                    return <CustomDrawerItem 
                              key={index} 
                              label={menu.label}
                              onPress={() => props.navigation.navigate(menu.name)} 
                              //onPress={menu.onPress}
                              //onPress={menu.isScreen ? undefined : menu.onPress}
                              //screen={menu.isScreen ? menu.screen : undefined} // Pass screen only if isScreen is true
                            />
                }
            )
        }
      </DrawerContentScrollView>
    );
  };

export default DrawerMenu;