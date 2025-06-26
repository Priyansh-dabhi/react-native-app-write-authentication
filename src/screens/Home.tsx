import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>;

const Home = ({navigation}:HomeProps) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:1,
        
    }
})