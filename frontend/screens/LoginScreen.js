import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function LoginScreen() {
  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>
       Bienvenido.
    </Text>
    <TextInput style = {styles.input} placeholder='Ingresa tu usuario:'>
    
    </TextInput>
    <TextInput  style = {styles.input} placeholder='Ingresa tu contrasena'>

    </TextInput>
    <Button title='Iniciar Sesion:'></Button>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
  });