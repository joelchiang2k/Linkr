import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'

const ConfirmResetPasswordScreen = () => {
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigation = useNavigation();
  
 
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  const onSubmitPressed = () => {
    navigation.navigate('HomeScreen')
  }

 
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300}}>
        <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput 
            placeholder="Code" 
            value={code}
            setValue={setCode}
        />

        <CustomInput 
            placeholder="Enter your new password" 
            value={newPassword}
            setValue={setNewPassword}
        />  

        <CustomButton text="Submit" onPress={onSubmitPressed}/>
        
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