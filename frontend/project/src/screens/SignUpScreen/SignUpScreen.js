import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import {useForm} from 'react-hook-form'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password')
  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }
  
  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail')
  }

  const onTermsOfUsePressed = () => {
    console.warn("sign up")
  }

  const onPrivacyPressed = () => {
    console.warn("sign up")
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300}}>
        <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
            name="username"
            control={control} 
            placeholder="Username"
            rules={{required: 'Username is required', 
                    minLength: {
                      value: 3, 
                      message: 'Username should be at least 3 characters long',
                    },
                    maxLength: {
                      value: 24,
                      message: 'Username should be max 24 characters long',
                    }
                  }} 
        />
        <CustomInput 
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
               value: EMAIL_REGEX,
               message: 'Email is invalid',
              }
            }}
        />
        <CustomInput
            name="password" 
            placeholder="Password"
            control={control}
            secureTextEntry={true}
            rules={{required: 'Password is required', 
                    minLength: {
                      value: 8, 
                      message: 'Password should be at least 8 characters long',
                    },
                    maxLength: {
                      value: 24,
                      message: 'Password should be max 24 characters long',
                    }
                  }} 
        />
        <CustomInput
            name="password-repeat" 
            placeholder="Repeat Password"
            control={control}
            secureTextEntry={true}
            rules={{
              validate: value => value == pwd || 'Password do not match'
            }}
        />

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)}/>

        <Text style={styles.text}>By registering, you confirm that you accept our{' '}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and 
            <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
        </Text>
        
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    root: {
        top: '30%',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
})

export default SignUpScreen;