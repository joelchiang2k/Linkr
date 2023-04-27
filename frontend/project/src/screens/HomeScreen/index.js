
import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image, SafeAreaView } from 'react-native';
import users from '../../../assets/data/users'
import AnimatedStack from '../../components/AnimatedStack';
import Card from '../../components/Card/Card'
import NavigationBar from '../../components/NavigationBar'
import axios from 'axios';
import { globalCache } from '../../global_cache'; // Import globalCache





export default function HomeScreen({route}) { // Add the route prop here
  const { list } = route.params.responseData;
  console.log('asdka');
  console.log("list", list);
  globalCache.userEmail = list[0].email;

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user)
  }

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.email);
    const emails = [list[0].email, user.email];
    // Make API call to backend
    axios({
      method: `post`,
      params: { 
        user: emails.join(",")
      },
      url: `http://10.186.18.81:8080/swipeRight`
  })
      .then(response => {
        console.log('Swipe right API call successful!', response);
      })
      .catch(error => {
        console.error('Error making swipe right API call:', error);
      });
  }

  return (
    <SafeAreaView style={styles.root}>
       <View style={styles.container}>
       <AnimatedStack
          data={list.slice(1)}
          renderItem={({item}) => <Card user={item} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
      </View>
    </SafeAreaView>
    
   
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
  },
  container: {
    justifyContent: 'center', //added this, might cause problems later
    alignItems: 'center', //added this
    flex: 1,
    backgroundColor: '#FFF',
  },
});