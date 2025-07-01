import { StyleSheet, Text, View , SafeAreaView, Image, Pressable } from 'react-native'
import React, { useContext, useState , useEffect } from 'react'

// react native elements
import {FAB} from 'react-native-paper'

//snakbar
import Snackbar from 'react-native-snackbar'
//context API
import {AppwriteContext} from '../Appwrite/AppwriteContext'

type UsesrObj = {
  name:string;
  email: string;
}


const Home = () => {

  const[userData, setUserData] = useState<UsesrObj>();

  const {appwrite,setIsLoggedIn} = useContext(AppwriteContext)
  const handleLogout = () => {
    appwrite.logout()
    .then(()=> {
      setIsLoggedIn(false);
      Snackbar.show({
        text:'Logout Successful',
        duration:Snackbar.LENGTH_SHORT
      })
    })
  }

  useEffect(() => {
    appwrite.getCurrentUser()
    .then(response => {
      if(response){
        const user: UsesrObj = {
          name:response.name,
          email: response.email,
        }
        setUserData(user)
      }
    })
  }, [appwrite])
  

  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            Build Fast. Scale Big. All in One Place.
          </Text>
          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
        style={{ backgroundColor: '#f02e65' }}
        icon="logout"   // Just the string name of the icon
        onPress={handleLogout}
/>

        {/* <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        >
          <Text>Signout</Text>
        </Pressable> */}
      </View>

  )
}

export default Home

const styles = StyleSheet.create({
  logoutButton:{
    // color:"#f02e65",
    
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
})