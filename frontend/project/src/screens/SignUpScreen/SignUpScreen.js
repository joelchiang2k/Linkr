import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import axios from 'axios';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const pwd = watch('password')
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(''); // add state for selected value
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [userTypeError, setUserTypeError] = useState('');

  const fillRandomData = () => {
    setValue('username', 'testuser');
    setValue('email', 'testuser@example.com');
    setValue('password', 'Test1234');
    setValue('password-repeat', 'Test1234');
    setSelectedValue('student');
    setSelectedUniversity('Purdue');
    setValue('gpa', '3.5');
    // Add any other fields you want to fill with random or predefined data
  };




  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }
  
  const onRegisterPressed = (data) => {
    if (selectedValue === '') {
      setUserTypeError('User type is required');
    } else {
      setUserTypeError('');
      
      console.log(data); // You can access form data here
      sendDataToBackend(data);
      //navigation.navigate('ConfirmEmail');
    }
  }

  const onTermsOfUsePressed = () => {
    console.warn("sign up")
  }

  const onPrivacyPressed = () => {
    console.warn("sign up")
  }

  const sendDataToBackend = async (data) => {
    try {
      const response = await axios.post('http://192.168.84.43:8080/signup', {
        ...data,
        userType: selectedValue.toUpperCase(),
        school: selectedValue === 'student' ? selectedUniversity.toUpperCase() : null,
        companyName: selectedValue === 'recruiter' ? data.companyName.toUpperCase() : null,
      });
  
      console.log(response.data);
      navigation.navigate('ConfirmEmail', { responseData: { email: response.data } });
  
    } catch (error) {
      //console.error('Error:', error);
      // handle errors, e.g., show an error message
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        // handle other errors
      }
    }
  };
  
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

        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            setUserTypeError(itemValue === '' ? 'User type is required' : '');
            if (itemValue === 'student' && selectedUniversity === '') {
              setSelectedUniversity('purdue');
            }
          }}
          style={{ width: '100%', marginBottom: 20 }}
        >

          <Picker.Item label="Select User Type" value="" />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Recruiter" value="recruiter" />
        </Picker>
        {userTypeError !== '' && <Text style={styles.errorText}>{userTypeError}</Text>}

        {selectedValue === 'recruiter' && (
          <CustomInput
            name="companyName"
            placeholder="Company Name"
            control={control}
            rules={{ required: 'Company name is required' }}
          />
        )}

        {selectedValue === 'student' && (
          <>
            <Picker
              selectedValue={selectedUniversity}
              onValueChange={(itemValue) => setSelectedUniversity(itemValue)}
              style={{ width: '100%', marginBottom: 20 }}
            >

              <Picker.Item label="Purdue" value="purdue" />
              <Picker.Item label="Virginia Tech" value="virginia_tech" />
              <Picker.Item label="U of Chicago" value="u_of_chicago" />
            </Picker>
            <CustomInput
              name="gpa"
              placeholder="GPA"
              control={control}
              keyboardType="numeric"
              rules={{
                required: 'GPA is required',
                min: {
                  value: 0,
                  message: 'GPA must be between 0 and 4.0',
                },
                max: {
                  value: 4,
                  message: 'GPA must be between 0 and 4.0',
                },
              }}
            />
          </>
        )}

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
        <View style={styles.randomDataButtonContainer}>
          <TouchableOpacity onPress={fillRandomData} style={styles.randomDataButton}>
            <Text style={styles.randomDataButtonText}>Fill with random data</Text>
          </TouchableOpacity>
        </View>



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
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
  });

export default SignUpScreen;