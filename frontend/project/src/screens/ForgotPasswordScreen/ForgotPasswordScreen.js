import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const [username, setUsername] = useState('')
  const navigation = useNavigation();

 
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  const onSendPressed = (data) => {
    console.log(data)
    navigation.navigate('NewPassword')
  }

 
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300}}>
        <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
            name="username" 
            placeholder="Username" 
            control={control}
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