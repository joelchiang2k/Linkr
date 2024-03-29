import { View, Text, StyleSheet, ImageBackground, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import * as OpenAnything from "react-native-openanything"

const Card = (props) => {
  const { picUrl, bio, username, location, companyName, logoUrl, title, jobPostLink,resumeCvLink, sponsorshipAvailability, desiredRole, school, sponsorshipStatus } = props.user;
  const { userType } = props;

  return (
    <View style={styles.card}>
        <ImageBackground source={{ uri: picUrl,}} style={styles.image}>
            <Image source={{uri: logoUrl,}} style={styles.logo}/>
        </ImageBackground>
        <View style={styles.cardInner}>
                <Text style={styles.name}>
                  {username}
                  <Text style={styles.title}> @ {(companyName ?? school)}</Text>
                </Text>
                <Text style={styles.bio}>{bio}</Text>
                <Text style={styles.listItem}>
                  <FontAwesome name="circle" size={8} color="#0096FF" /> 
                  <Text style={styles.work}> {(userType === "RECRUITER" ? "Work Authorization" : "Sponsorship Status")}: {(sponsorshipAvailability ?? sponsorshipStatus)}</Text>
                </Text>
                <Text style={styles.listItem}>
                  <FontAwesome name="circle" size={8} color="#0096FF" /> 
                  <Text style={styles.role}> Desired Role: {desiredRole}</Text>
                </Text>
               
                <TouchableOpacity style={styles.button} onPress={() => OpenAnything.Pdf(jobPostLink ?? resumeCvLink)}>
                  <FontAwesome name="paperclip" size={24} color="white" />
                </TouchableOpacity>
                
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
      borderColor: '#D3D3D3',
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
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      padding: 10,
    },
    title: {
      fontSize: 15,
      fontWeight:'bold',
      color: '#36454F',
    },
    bio: {
      fontSize: 18,
      color: 'grey',
      lineHeight: 25,
      padding: 10,
    },

    work: {
      fontSize: 13,
      padding: 10,
      color: '#36454F',
      fontWeight: 'bold',
    },
    role: {
      fontSize: 13,
      padding: 10,
      color: '#36454F',
      fontWeight: 'bold',
    },
    post: {
      fontSize: 13,
      padding: 10,
      color: '#36454F',
      fontWeight: 'bold',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    button: {
      position: 'absolute',
      backgroundColor: '#0096FF',
      borderWidth: 1,
      fontWeight: 'bold',
      padding: 10,
      borderRadius: 50,
      borderColor: '#0096FF',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      right: 12,
      top: '122%',
      marginTop: -25, // to vertically center the button
    },

  });

export default Card