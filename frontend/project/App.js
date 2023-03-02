import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image } from 'react-native';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ConfirmResetPasswordScreen from './src/screens/ConfirmResetPasswordScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Navigation from './src/navigation' 
import Card from './src/components/Card'
import users from './assets/data/users'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, useDerivedValue, interpolate, withSpring, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import Like from './assets/images/LIKE.png'
import Nope from './assets/images/nope.png'
import AnimatedStack from './src/components/AnimatedStack';


export default function App() {

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name)
  }

  const onSwipeRight = (user) => {
    console.warn("swipe right", user.name)
  }

  return (
    <View style={styles.container}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', //added this, might cause problems later
    alignItems: 'center', //added this
    flex: 1,
    backgroundColor: '#FFF',
  },
});
