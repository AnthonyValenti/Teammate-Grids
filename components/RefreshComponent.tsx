import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface RefreshButtonProps {
  onPress: () => void;
  
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Refresh</Text>
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue', 
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: '5%',
    height: '100%',
    width: '20%'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RefreshButton;
