import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

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
                
              <View style={styles.icons}>
                <View style={{...styles.button, borderWidth: 1, borderColor: '#FBD88B'}}>
                  <FontAwesome name="undo" size={30} color='#FBD88B' />
                </View>
                <View style={{...styles.button, borderWidth: 1, borderColor: '#F76C6B'}}>
                  <Entypo name="cross" size={30} color='#F76C6B' />
                </View>
                <View style={{...styles.button, borderWidth: 1, borderColor: '#3AB4CC'}}>
                  <FontAwesome name="star" size={30} color='#3AB4CC' />
                </View>
                <View style={{...styles.button, borderWidth: 1, borderColor: '#4FCC94'}}>
                  <FontAwesome name="heart" size={30} color='#4FCC94' />
                </View>
                <View style={{...styles.button, borderWidth: 1, borderColor: '#A65CD2'}}>
                  <Ionicons name="flash" size={30} color='#A65CD2' />
                </View>  
              </View>
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
      width: '108%',
      height: '120%',
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
      padding: 20,
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
    icons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 10,
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