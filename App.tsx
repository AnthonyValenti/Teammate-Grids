import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlayerGrid from './components/PlayerGrid';
import LoginPage from './components/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Teammate Grid'>
        <Stack.Screen name="Teammate Grid" component={PlayerGrid}

        />
        <Stack.Screen name="Login" component={LoginPage}
          options={
            {
              title:"Login",
              headerStyle:{
                backgroundColor: 'dimgrey',
              },
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 25,
                color: 'white',
              },
            }
          }
        
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
}