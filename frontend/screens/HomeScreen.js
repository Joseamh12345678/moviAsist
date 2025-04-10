// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const posts = [
  {
    id: '1',
    user: 'john_doe',
    description: 'El camion tardo demaciado. ☀️',
    image: 'https://th.bing.com/th/id/OIP.r0RjYNdJtwfoJY2y8t7iVQHaHJ?w=201&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    likes: 120,
    comments: 14,
  },
  {
    id: '2',
    user: 'jane_smith',
    description: 'El chofer estaba menso. 😍',
    image: 'https://s1.ppllstatics.com/ideal/www/multimedia/202212/20/media/cortadas/camion-volcado-kWPI-U19016693179w7C-1248x770@Ideal.jpg',
    likes: 89,
    comments: 8,
  },
  {
    id: '3',
    user: 'the_traveler',
    description: 'Se perdio el chofer 🚗🗺️',
    image: 'https://cdn.verbub.com/images/no-mms-este-no-va-pa-el-centro-16538.jpg',
    likes: 200,
    comments: 33,
  },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.username}>{item.user}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.actions}>
        <Ionicons name="heart-outline" size={24} style={styles.icon} />
        <Ionicons name="chatbubble-outline" size={24} style={styles.icon} />
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.comments}>{item.comments} comments</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 70, 
  },
  post: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  icon: {
    marginRight: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    marginTop: 4,
  },
  comments: {
    color: '#555',
    marginTop: 2,
  },
});
