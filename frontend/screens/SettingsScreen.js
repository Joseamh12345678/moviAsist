import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';

export default function SettingsScreen() {
  const handlePress = (option) => {
    Alert.alert(`${option}`, `Has presionado: ${option}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Configuración</Text>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Cuenta')}>
          <Ionicons name="person-circle-outline" size={24} color="#555" />
          <Text style={styles.optionText}>Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Notificaciones')}>
          <Ionicons name="notifications-outline" size={24} color="#555" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Privacidad')}>
          <Ionicons name="lock-closed-outline" size={24} color="#555" />
          <Text style={styles.optionText}>Privacidad</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handlePress('Tema oscuro')}>
          <Ionicons name="moon-outline" size={24} color="#555" />
          <Text style={styles.optionText}>Tema oscuro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, styles.logout]} onPress={() => handlePress('Cerrar sesión')}>
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text style={[styles.optionText, { color: 'red' }]}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    padding: 20,
    paddingBottom: 80, // espacio para el BottomNavBar
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logout: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
});
