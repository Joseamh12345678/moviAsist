import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Asegúrate de importar la configuración de Firebase
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async () => {
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", usuario.user);
      setMensaje("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en el login:", error.message);
      setMensaje("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Iniciar Sesión" onPress={()=>navigation.navigate("Home")} />
      
      {mensaje ? <Text style={styles.resultado}>{mensaje}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  }
});
