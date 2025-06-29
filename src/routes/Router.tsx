import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

//navigaiton
import { NavigationContainer } from '@react-navigation/native'

import {AppwriteContext} from '../Appwrite/AppwriteContext'
import Loading from '../Components/Loading'

//Routes
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export const Router = () => {
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const {appwrite,isLoggedIn,setIsLoggedIn} = useContext(AppwriteContext);

    useEffect(() => {
        //above appwrite is an object of an class appwriteService in service file.
        appwrite
    .getCurrentUser()
    .then(response =>{
        setIsLoading(false)
        if(response){
            setIsLoggedIn(true)
        }
    })
    .catch(_ => {
        setIsLoading(false)
        setIsLoggedIn(false)
    })
}, [appwrite,setIsLoggedIn])

    if(isLoading){
        return <Loading/>;
    }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

