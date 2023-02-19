import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'



const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('')
  const navigation = useNavigation();
 
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }

  const onResendPressed = () => {
    console.warn("resend")
  }

  const onConfirmPressed = () => {
    navigation.navigate('HomeScreen')
  }

 
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300}}>
        <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput 
            placeholder="Enter your confrimation code" 
            value={code}
            setValue={setCode}
        />

        <CustomButton text="Confirm" onPress={onConfirmPressed}/>
        
        <CustomButton 
            text="Resend code" 
            onPress={onResendPressed}
            type="SECONDARY"
        />

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
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
})

export default ConfirmEmailScreen;