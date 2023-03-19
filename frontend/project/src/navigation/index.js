import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ConfirmResetPasswordScreen from '../screens/ConfirmResetPasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen'
import MatchesScreen from '../screens/MatchesScreen';
import NavigationBar from '../components/NavigationBar';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Navigation = () => {
  const navigationRef = useNavigationContainerRef();
  const [currentPage, setCurrentPage] = useState('HomeScreen');

  const handleNavigationReady = () => {
    const currentRoute = navigationRef.getCurrentRoute();
    console.log("currentRoute: ", currentRoute)
    setCurrentPage(currentRoute.name);
  };

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      const currentRoute = navigationRef.getCurrentRoute();
      setCurrentPage(currentRoute.name);
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef} onReady={handleNavigationReady}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="NewPassword" component={ConfirmResetPasswordScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
        {<NavigationBar currentPage={currentPage} />}
    </NavigationContainer>
  )
}

export default Navigation