import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View, Image, SafeAreaView } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useRoute, useNavigationContainerRef } from '@react-navigation/native'


const NavigationBar = ({currentPage, pushEmail}) => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = '#b5b5b5';
  const activeColor = '#0096FF'
  const goldColor = '#D4AF37'
  console.log("currentPage:", currentPage)
  if(currentPage == 'SignIn' || currentPage == 'SignUp' || currentPage == 'ConfirmEmail' || currentPage == 'ForgotPassword' || currentPage == 'NewPassword'){
    return null
  }

  return (
    (
        <View style={styles.bottomNavigation}>
          <Pressable onPress={() => {setActiveScreen('HOME'); navigation.navigate('HomeScreen')}}>
            <Fontisto name="tinder" size={30} color={activeScreen == 'HOME' ? activeColor : color} />
          </Pressable>
          <Pressable onPress={() => {setActiveScreen('EXPLORE')}}>
            <MaterialCommunityIcons name="star-four-points" size={30} color={activeScreen == 'EXPLORE' ? goldColor : color} />
          </Pressable>
          <Pressable onPress={() => {setActiveScreen('CHAT'); navigation.navigate('MatchesScreen', { email: pushEmail })}}>
  <Ionicons name="ios-chatbubbles" size={30} color={activeScreen == 'CHAT' ? activeColor : color} />
</Pressable>
          <Pressable onPress={() => {setActiveScreen('USER'); navigation.navigate('ProfileScreen')}}>
            <FontAwesome name="user" size={30} color={activeScreen == 'USER' ? activeColor : color} />
          </Pressable>
         </View>
    )
    )
    

  
}

const styles = StyleSheet.create({
    bottomNavigation:{
      flexDirection:'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 20,
    },
  });

export default NavigationBar