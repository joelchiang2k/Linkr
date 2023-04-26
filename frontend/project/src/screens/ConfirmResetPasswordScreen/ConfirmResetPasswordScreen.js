import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import axios from 'axios';

const ConfirmResetPasswordScreen = ({ route }) => {
  const {control, handleSubmit} = useForm();
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigation = useNavigation();
  const email = route.params.email;
  console.log('Email:', email);


  
 
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  const onSubmitPressed = (data) => {
    axios({
      method: 'post',
      params: {
        email: email,
        code: data.code,
        password: data.password,
      },
      url: 'http://10.186.0.39:8080/resetPwd',
    })
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'Password reset successfully', [
          { text: 'OK', onPress: () => navigation.navigate('HomeScreen') },
        ]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
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
            name="code" 
            placeholder="Code" 
            control={control}
            rules={{
                required: 'Code is required'
            }}
        />

        <CustomInput
            name="password" 
            placeholder="Enter your new password" 
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

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        
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

export default ConfirmResetPasswordScreen;