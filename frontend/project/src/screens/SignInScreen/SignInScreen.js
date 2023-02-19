import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from '../../../assets/images/link.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'

const SignInScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  
  const onSignInPressed = () => {
    //validate user
    navigation.navigate('HomeScreen')
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
            placeholder="Username" 
            value={username}
            setValue={setUsername}
        />
        <CustomInput 
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
        />

        <CustomButton text="Sign In" onPress={onSignInPressed}/>
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