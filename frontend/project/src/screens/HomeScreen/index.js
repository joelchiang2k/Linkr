
import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image, SafeAreaView } from 'react-native';
import users from '../../../assets/data/users'
import AnimatedStack from '../../components/AnimatedStack';
import Card from '../../components/Card/Card'
import NavigationBar from '../../components/NavigationBar'





export default function HomeScreen({route}) { // Add the route prop here
  const { list } = route.params.responseData;
  console.log('asdka');
  console.log("list", list);
  const onSwipeLeft = (user) => {
    console.warn("swipe left", user)
  }

  const onSwipeRight = (user) => {
    console.warn("swipe right", user)

    //Check if user swiped on you
    // if(user['matches'].includes(myuser.id)){
    //   //USER MATCHED
    // }

    // myuser['matches'].push(user.id)
  }

  return (
    <SafeAreaView style={styles.root}>
       <View style={styles.container}>
       <AnimatedStack
          data={list}
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