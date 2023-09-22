import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Modal, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

interface HowToPlayProps {
  isVisible: boolean
  onClose: () => void;

}

const HowToPlay: React.FC<HowToPlayProps> = ({ isVisible , onClose }) => {
  return (
    <Modal
    visible={isVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={() => {
            onClose();
          }}
           style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.text}>How To Play</Text>
        <Text style={styles.text2}>Select a player that has played with both the row and col player in the regular season</Text>
        <Text style={styles.text2}>The only seasons under consideration are 20/21 to 22/23</Text>
        <Text style={styles.text2}>You can only use a player name once</Text>
        <Text style={styles.text2}>More points are awarded for selecting a player with fewer points between the 20/21 and 20/23 seasons</Text>
        <Text style={styles.text3}>Top 25% in points: 1 point </Text>
        <Text style={styles.text3}>Top 25-50% in points: 2 points </Text>
        <Text style={styles.text3}>Top 50-75% in points: 3 points </Text>
        <Text style={styles.text3}>Bottom 25% in points: 4 points </Text>




      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: isMobile ? '80%' : '40%',
      height: '60%',
      backgroundColor: 'darkblue',
      padding: 20,
      borderRadius: 8,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 5,
    },
    closeButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'red',
    },
    text:{
      fontSize: 25,
      fontWeight: '900',
      color: 'white',
      justifyContent: 'center',
  
    },
    text2:{
        fontSize: 16,
        fontWeight: '900',
        color: 'white',
        marginTop:'5%',
        textAlign: 'left'
    
      },
      text3:{
        fontSize: 14,
        fontWeight: '900',
        color: 'white',
        marginTop:'5%',
        textAlign: 'left'
    
      },

  });

export default HowToPlay;
