import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

const Card = (props) => {
  const{image, bio, name} = props.user;
  return (
    <View style={styles.card}>
        <ImageBackground
            source={{
                uri: image,
            }}
            style={styles.image}>
            <View style={styles.cardInner}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.bio}>{bio}</Text>
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      backgroundColor: '#fefefe',
      shadowColor: "#000",
      backgroundColor: '#fefefe',
      shadowOffset: {
	    width: 0,
	    height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,

      elevation: 19,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden',
  
      justifyContent: 'flex-end',
    },
    cardInner: {
      padding: 10,
    },
    name: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    },
    bio: {
      fontSize: 18,
      color: 'white',
      lineHeight: 25,
    },
  });

export default Card