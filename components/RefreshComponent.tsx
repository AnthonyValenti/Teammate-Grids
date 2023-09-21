import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface RefreshButtonProps {
  onPress: () => void;
  
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onPress }) => {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Refresh</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue', 
    borderRadius: 15,
    justifyContent: 'center',
    height: '100%',
    width:'50%'
  },
  text: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default RefreshButton;
