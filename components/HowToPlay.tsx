import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Modal } from 'react-native';

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
        <Text style={styles.text2}>More points are awarded for selecting a player with fewer points in the 20/21 to 20/23 seasons</Text>


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
      width: '40%',
      height: '50%',
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

  });

export default HowToPlay;
