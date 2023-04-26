import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import axios from 'axios';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const [username, setUsername] = useState('')
  const navigation = useNavigation();

 
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  const onSendPressed = (data) => {
    console.log(data);
  
    axios({
      method: 'post',
      params: {
        username: data.username,
      },
      url: 'http://10.186.0.39:8080/forgetPwd',
    })
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', response.data, [
          { text: 'OK', onPress: () => navigation.navigate('NewPassword', { email: data.username }) },
        ]);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Alert.alert('Error', error.response.data);
        } else {
          console.log(error);
        }
      });
  }
  

 
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300}}>
        <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
            name="username" 
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

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)}/>
        
        <CustomButton 
            text="Back to Sign in" 
            onPress={onSignInPressed}
            type="TERTIARY"
        />

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
        color: 'grays',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
})

export default ForgotPasswordScreen;