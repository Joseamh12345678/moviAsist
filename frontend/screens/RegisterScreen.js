import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth, createUserWithEmailAndPassword } from "../firebaseConfig.js";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa un correo y una contraseña.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Éxito", "Usuario registrado con éxito.");
      navigation.navigate("Login"); // Navegar automáticamente a Login
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      Alert.alert("Error en el registro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crea Una Cuenta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
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
      <Button title="Registrar" onPress={handleRegister} />
      <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
      <Button title="Inicia Sesión" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5, borderColor: "#ccc" },
  text: { textAlign: "center", marginVertical: 10, fontSize: 16 },
});
