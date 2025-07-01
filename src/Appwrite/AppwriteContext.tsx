import { View, Text } from 'react-native'
import React, { createContext, FC } from 'react'
import { PropsWithChildren , useState} from 'react'
import Appwrite from './service'


type AppContextType = {
    appwrite:Appwrite
    isLoggedIn : boolean
    setIsLoggedIn:(isLoggedIn:boolean)=>void
}

export const AppwriteContext = createContext<AppContextType>({
    // passing values
    appwrite: new Appwrite(),
    isLoggedIn : false,
    setIsLoggedIn:()=>{}
})

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
    
        const [isLoggedIn,setIsLoggedIn] = useState(false);
        const defauldtValue = {
            appwrite: new Appwrite(),
            isLoggedIn,
            setIsLoggedIn
        }
    return (
    <AppwriteContext.Provider value={defauldtValue}>
      {children}
    </AppwriteContext.Provider>
  )
}

