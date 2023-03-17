import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import users from '../../../assets/data/users'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProfileScreen = () => {
  const {image, bio, name, title, company, location} = users[0]
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}} = useForm();
  
  const onSignOutPressed = () => {
    navigation.navigate('SignIn')
  }

  const onSaveChangesPressed = () => {
    console.warn("Changes saved")
  }
  
  const onImagePressed = () => {
    console.warn("View Card")
  }

  return (
    <ScrollView>
      <View style={styles.root}>
      </View> 
      <View style={styles.container}>
        <Pressable onPress={onImagePressed} style={styles.user}>
          <View>
            <Image source={{ uri: image }} style={styles.image}></Image>
          </View>
        </Pressable>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title} @ {company}</Text>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={20} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.editstyle}>EDIT CARD</Text>
      </View>
      <View>
        <Text style={styles.personalInfo}>ABOUT ME</Text>
        <CustomInput 
          name="About"
          control={control} 
          />
        <Text style={styles.personalInfo}>JOB TITLE</Text>
        <CustomInput 
          name="JobTitle"
          placeholder="Add job title"
          control={control} 
          />
        <Text style={styles.personalInfo}>COMPANY</Text>
        <CustomInput 
          name="Company"
          placeholder="Add company"
          control={control} 
          />
        <Text style={styles.personalInfo}>EDUCATION</Text>
        <CustomInput 
          name="Education"
          placeholder="Add education"
          control={control} 
          />
        <Text style={styles.personalInfo}>LOCATION</Text>
        <CustomInput 
          name="Location"
          placeholder="Add location"
          control={control} 
          />
      </View>
      
      <View style={styles.container}>
        <CustomButton text="Save Changes" onPress={onSaveChangesPressed} style={styles.saveChanges}/>
        <CustomButton text="Sign Out" onPress={onSignOutPressed}/>
      </View>

    </ScrollView>
  )    
}

const styles = StyleSheet.create({
  root:{
    padding: 10, 
    width:'100%',
    backgroundColor:'#000',
    height: 150,
  },
  user: {
    flex: 1,
    width: 140,
    height: 140,
    margin: 10,
    borderRadius: 100,
    marginTop: -70,
    borderWidth: 2,
    padding: 3,
    borderColor: '#0096FF',
    alignItems:'center',
  },
  image:{
    width:130,
    height:130,
    borderRadius:100,
  },
  container:{
    alignItems:'center',
    flex: 1,
    padding: 20,
  },
  name:{
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'grey',
  },
  viewstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  editstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  personalInfo:{
    fontWeight: 'bold',
  },
  location:{
    flexDirection: 'row', 
    alignItems:'center',
    padding: 10,
  },
  locationText:{
    fontSize: 15,
    fontWeight: 'bold',
  }
})
export default ProfileScreen