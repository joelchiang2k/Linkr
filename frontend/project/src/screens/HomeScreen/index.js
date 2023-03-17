
import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image, SafeAreaView } from 'react-native';
import users from '../../../assets/data/users'
import AnimatedStack from '../../components/AnimatedStack';
import Card from '../../components/Card/Card'
import NavigationBar from '../../components/NavigationBar'





export default function HomeScreen() {
  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name)
  }

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.name)
  }

  return (
    <SafeAreaView style={styles.root}>
       <View style={styles.container}>
        <AnimatedStack
          data={users}
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