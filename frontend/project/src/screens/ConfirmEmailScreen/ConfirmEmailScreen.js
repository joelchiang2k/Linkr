import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const ConfirmEmailScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const responseData = route.params?.responseData || null;

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  const onResendPressed = async () => {
    try {
      const response = await axios.post("http://192.168.84.43:8080/authAgain", responseData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Code resent successfully", response.data);
      Alert.alert("Success", "Code resent successfully");
    } catch (error) {
      console.error("Error resending code:", error);
      Alert.alert("Error", "Failed to resend code");
    }
  };

  const onConfirmPressed = async (data) => {
    console.log(data);

    try {
      const email = responseData.email; // assuming email is a property of responseData

      const response = await axios.post("http://192.168.84.43:8080/authConfirm", {
        email: email,
        keyCode: data.code,
      });

      console.log("Email confirmed successfully", response.data);
      Alert.alert(
        'Success',
        'Email confirmed successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen'),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      //console.error("Error confirming email:", error);
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", error.response.data);
      } else {
        Alert.alert("Error", "Authentication failed");
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton text="Resend code" onPress={onResendPressed} type="SECONDARY" />

        <CustomButton text="Back to Sign in" onPress={onSignInPressed} type="TERTIARY" />
      </View>
    </ScrollView>
  );
};

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
  },
});

export default ConfirmEmailScreen;