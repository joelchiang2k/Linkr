import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

const Card = (props) => {
  const{image, bio, name, location, company, logo, title} = props.user;
  return (
    <View style={styles.card}>
        <ImageBackground source={{ uri: image,}} style={styles.image}>
            <Image source={{uri: logo,}} style={styles.logo}/>
        </ImageBackground>
        <View style={styles.cardInner}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.title}>{title} @ {company}</Text>
                <Text style={styles.bio}>{bio}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
      width: '108%',
      height: '130%',
      borderRadius: 10,
      backgroundColor: '#fefefe',
      shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,

      elevation: 19,
    },

    logo: {
      width: 100,
      height: 100,
      position: 'absolute',
      bottom: -50,
      right: 20,
      backgroundColor: 'white',
      borderRadius: 50,
      borderColor: 'grey',
      borderWidth: 1,
    },

    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
      backgroundColor:'blue',
    },
    cardInner: {
      padding: 20,
      justifyContent:'flex-end',
    },
    name: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
      padding: 10,
    },
    bio: {
      fontSize: 18,
      color: 'grey',
      lineHeight: 25,
      padding: 10,
    },
    title: {
      fontSize: 15,
      padding: 10,
      fontWeight:'bold',
      color: '#36454F',
    },
    button: {
      backgroundColor: 'transparent',
      padding: 10,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    }
  });

export default Card