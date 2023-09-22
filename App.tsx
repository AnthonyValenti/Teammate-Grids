import PlayerGrid from './components/PlayerGrid';
import LoginPage from './components/LoginPage';
import PastScores from './components/PastScores';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Teammate Grid" component={PlayerGrid}
          options={
            {
              title: "Teammate Grids",
              headerStyle: {
                backgroundColor: 'midnightblue',
              },
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 25,
                color: 'white',
              },
            }
          }
        />
        <Stack.Screen name="Scores" component={PastScores}
          options={
            {
              title: "History",
              headerStyle: {
                backgroundColor: 'midnightblue',
              },
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 25,
                color: 'white',
              },
            }
          }
        />
        <Stack.Screen name="Login" component={LoginPage}
          options={
            {
              title: "Login",
              headerStyle: {
                backgroundColor: 'midnightblue',
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