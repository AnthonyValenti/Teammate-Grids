import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions} from 'react-native';


const { width } = Dimensions.get('window');
const isMobile = width < 768;
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
    backgroundColor: 'orangered', 
    borderRadius: 15,
    justifyContent: 'center',
    height: '100%',
    width: isMobile ? '90%' : '50%',

  },
  text: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default RefreshButton;
