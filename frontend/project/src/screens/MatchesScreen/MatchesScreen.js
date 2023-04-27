import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalCache } from '../../global_cache'; // Import globalCache

import axios from 'axios';

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);
  const route = useRoute();
  const email = globalCache.userEmail;
  console.log("Email passed to MatchesScreen:", email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://10.186.18.81:8080/user/matches?email=${email}`);
        setMatches(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [email]);

  const onChatPressed = (user) => {
    console.log(user);
    if (pressedUsers.includes(user.email)) {
      // User has been pressed before, call login API
      axios.post('http://localhost:3001/chated', { username: user.username, secret })
        .then((response) => {
          console.log(response.data);
          // Navigate to chat screen with user data
          navigation.navigate('ChatScreen', { user: response.data });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      // User has not been pressed before, call signup API
      axios.post('http://localhost:3001/chat', {
        username: user.username,
        secret,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      })
        .then((response) => {
          console.log(response.data);
          // Update pressedUsers state
          setPressedUsers([...pressedUsers, user.email]);
          // Navigate to chat screen with user data
          navigation.navigate('ChatScreen', { user: response.data });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };


  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Matches</Text>
        <View style={styles.matches}>
          {matches.map((match) => (
            <TouchableOpacity key={match.email} style={styles.match} onPress={() => onChatPressed(match)}>
              <Image source={{ uri: match.image }} style={styles.image} />
              <View style={styles.userInfo}>
                <Text style={styles.name}>{match.username}</Text>
                <View style={styles.contactInfo}>
                  <Text style={styles.email}>{match.email}</Text>
                  <Text style={styles.phoneNumber}>{match.phoneNumber}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#0096FF',
    marginBottom: 20,
  },
  matches: {
    flex: 1,
  },
  match: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneNumber: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MatchesScreen;
