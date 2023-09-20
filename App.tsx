import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlayerGrid from './components/PlayerGrid'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.tite}>Player Grids</Text>
      <PlayerGrid/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tite:{
    fontSize: 35,
    fontWeight: '900',
    marginBottom:'2%',
    
  }
});
