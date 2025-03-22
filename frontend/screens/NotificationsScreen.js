import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationsScreen() {
    const navigation = useNavigation();
            const route = useRoute();
  return (
     <View style={styles.container}>
               {/* Texto principal */}
               <View style={styles.textContainer}>
                 <Text style={styles.title}>Welcome to Notifications Screen!</Text>
               </View>
         
               {/* Iconos como botones */}
               <View style={styles.buttonContainer}>
                <TouchableOpacity
                          onPress={() => navigation.navigate('Home')}
                        >
                          <Ionicons
                            name="home"
                            size={25}
                            color={route.name === 'Home' ? 'black' : '#777'} // Íconos inactivos en gris oscuro
                            style={[styles.icon, route.name === 'Home' && styles.activeIcon]}
                          />
                        </TouchableOpacity>
                        
                 <TouchableOpacity
                   onPress={() => navigation.navigate('Notifications')}
                 >
                   <Ionicons
                     name="notifications"
                     size={25}
                     color={route.name === 'Notifications' ? 'black' : '#777'} // Íconos inactivos en gris oscuro
                     style={[styles.icon, route.name === 'Notifications' && styles.activeIcon]}
                   />
                 </TouchableOpacity>
         
                 <TouchableOpacity
                   onPress={() => navigation.navigate('Profile')}
                 >
                   <Ionicons
                     name="person"
                     size={25}
                     color={route.name === 'Profile' ? 'black' : '#777'}
                     style={[styles.icon, route.name === 'Profile' && styles.activeIcon]}
                   />
                 </TouchableOpacity>
         
                 <TouchableOpacity
                   onPress={() => navigation.navigate('Settings')}
                 >
                   <Ionicons
                     name="settings"
                     size={25}
                     color={route.name === 'Settings' ? 'black' : '#777'}
                     style={[styles.icon, route.name === 'Settings' && styles.activeIcon]}
                   />
                 </TouchableOpacity>
               </View>
             </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Fondo blanco
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#CCC',
    },
    icon: {
      padding: 10, // Espaciado táctil
      borderRadius: 8, // Redondeo sutil para mejorar visibilidad
    },
    activeIcon: {
      backgroundColor: '#E6E6E6', // Fondo gris claro para ícono activo
    },
  });
  