import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import NavigationBar from '../../components/NavigationBar';
import users from '../../../assets/data/users'
import ChatList from '../../components/ChatList'

const MatchesScreen = () => {
    // const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: '#0096FF'}}>
            New Matches
          </Text>
          <View style={styles.users}>
            {users.map(user => (
              <View style={styles.user} key={user.id}>
                <Image source={{uri: user.image}} style={styles.image} />
              </View>
            ))}
          </View>
          <ChatList />
        </View>
        

      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    root: {
      width: '100%',
      flex: 1,
      padding: 10,
    },
    container: {
      padding: 10,
      flex: 1,
    },
    users: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    bar: {
        position: 'absolute',
        bottom: 0,
    },
    user: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 50,
  
      borderWidth: 2,
      padding: 3,
      borderColor: '#0096FF',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
  });

export default MatchesScreen