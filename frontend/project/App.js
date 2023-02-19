import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ConfirmResetPasswordScreen from './src/screens/ConfirmResetPasswordScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Navigation from './src/navigation'  

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
