// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

const posts = [
  'https://via.placeholder.com/150/92c952',
  'https://via.placeholder.com/150/771796',
  'https://via.placeholder.com/150/24f355',
  'https://via.placeholder.com/150/d32776',
  'https://via.placeholder.com/150/f66b97',
  'https://via.placeholder.com/150/56a8c2',
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Perfil arriba */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://wallpaperaccess.com/full/13613086.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.username}>@diego_dev</Text>
          <Text style={styles.bio}>Desarrollador apasionado por la tecnología 🚀</Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>134</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Grid de publicaciones */}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.postImage} />
        )}
        contentContainerStyle={styles.postGrid}
        showsVerticalScrollIndicator={false}
      />

      {/* Barra inferior */}
      <BottomNavBar />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const imageSize = windowWidth / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bio: {
    color: '#666',
    marginTop: 4,
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  statLabel: {
    color: '#777',
    fontSize: 12,
  },
  postGrid: {
    paddingBottom: 70,
  },
  postImage: {
    width: imageSize,
    height: imageSize,
  },
});
