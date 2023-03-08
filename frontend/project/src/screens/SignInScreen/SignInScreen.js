import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput } from 'react-native'
import Logo from '../../../assets/images/link.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios'

const SignInScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}} = useForm();
  console.log(errors)
  
  const onSignInPressed = (data) => {
    //validate user
    console.log(data)
    axios({
      method: `post`,
      params: { username: data.username,
      password: data.password},
      url: `http://localhost:8080/login`
    }).then((response) => {
      console.log(response.data);
      navigation.navigate('HomeScreen', { responseData: response.data })

    });
  }
  
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }
  
  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
  }
  return (
    <ScrollView>
        <View style={styles.root}>
        <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.3}]} 
            resizeMode="contain" 
        />

        <CustomInput 
            name="username"
            placeholder="Username" 
            control={control}
            rules={{required: 'Username is required'}}
        />
        <CustomInput 
            name="password"
            placeholder="Password"
            control={control}
            secureTextEntry={true}
            rules={{required: 'Password is required', minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters long',
            }}}
        />

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)}/>
        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
        <CustomButton text="Don't have an account? Register" onPress={onSignUpPressed} type="TERTIARY"/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        height: 100,
        width: 100,
    },
})

export default SignInScreen;