// components/BottomNavBar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BottomNavBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Notifications', icon: 'notifications' },
    { name: 'Profile', icon: 'person' },
    { name: 'Settings', icon: 'settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => navigation.navigate(tab.name)}
          accessibilityLabel={`Go to ${tab.name}`}
          accessibilityRole="button"
        >
          <Ionicons
            name={tab.icon}
            size={25}
            color={route.name === tab.name ? 'black' : '#777'}
            style={[styles.icon, route.name === tab.name && styles.activeIcon]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  icon: {
    padding: 10,
    borderRadius: 8,
  },
  activeIcon: {
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    borderColor: '#aaa',
  },
});
