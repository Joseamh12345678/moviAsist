// screens/NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const notifications = [
  {
    id: '1',
    type: 'like',
    user: 'john_doe',
    message: 'liked your post',
    icon: 'heart',
    time: '2m ago',
  },
  {
    id: '2',
    type: 'comment',
    user: 'jane_smith',
    message: 'commented: Ese chofer choco!',
    icon: 'chatbubble',
    time: '5m ago',
  },
  {
    id: '3',
    type: 'follow',
    user: 'alex_99',
    message: 'started following you',
    icon: 'person-add',
    time: '1h ago',
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Ionicons name={item.icon} size={24} color="#007AFF" style={styles.icon} />
      <View>
        <Text style={styles.text}>
          <Text style={styles.user}>{item.user} </Text>
          {item.message}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    padding: 15,
    paddingBottom: 70,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  text: {
    fontSize: 15,
  },
  user: {
    fontWeight: 'bold',
  },
  time: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
});
