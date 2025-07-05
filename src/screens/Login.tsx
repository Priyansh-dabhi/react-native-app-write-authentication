import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import React,{useContext,useState} from 'react'
//react native elements
import { FAB } from 'react-native-paper'
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import {AppwriteContext} from '../Appwrite/AppwriteContext'

// Navigation
import Signup from './Signup'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthStack';
import { NavigationContainer } from '@react-navigation/native'
import AppStack from '../routes/AppStack'

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>



const Login = ({navigation}: LoginScreenProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

const handleLogin = async () => {
  if (email.length < 1 || password.length < 1) {
    setError('All fields are required');
  } else {
    try {
      // Check if user already has an active session
      const currentUser = await appwrite.getCurrentUser();
      if (currentUser) {
        Snackbar.show({
          text: 'You are already logged in',
          duration: Snackbar.LENGTH_SHORT,
        });
        setIsLoggedIn(true);
        {<NavigationContainer>
          <AppStack/>
        </NavigationContainer>}
        return;
      }

      // If no session, attempt login
      const user = { email, password };
      const response = await appwrite.login(user);

      if (response) {
        setIsLoggedIn(true);
        Snackbar.show({
          text: 'Login Success',
          duration: Snackbar.LENGTH_SHORT,
        });
        <NavigationContainer>
          <AppStack/>
        </NavigationContainer>
      }
    } catch (error: any) {
      console.log(error);

      Snackbar.show({
        text: error.message || 'Incorrect email or password',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
})