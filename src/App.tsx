import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppwriteProvider } from './Appwrite/AppwriteContext'; // ✅ Adjust path if needed
import Home from './screens/Home';
import Login from './screens/Login';
import AuthStack from './routes/AuthStack';



export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <AppwriteProvider>
          <NavigationContainer>
          <AuthStack/>
        </NavigationContainer>
      </AppwriteProvider>

  );
}
//   return (
//     <AppwriteProvider>  {/* ✅ Wrap entire app */}
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{
//               headerShown: false,
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppwriteProvider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
