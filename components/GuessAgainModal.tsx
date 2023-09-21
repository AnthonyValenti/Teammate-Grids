import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GuessAgainModal {
  isVisible: boolean;
  onClose: () => void;
}

const GuessAgainModal: React.FC<GuessAgainModal> = ({isVisible, onClose}) => {


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
          <Text style={styles.text}>Oops!</Text>
          <Text style={styles.text2}>You already guessed that player, choose another name!</Text>
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
    width: '30%',
    height: '20%',
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: '900',

  },
  text2:{
    fontSize: 14,
    fontWeight: '500',
    marginTop:'8%',

  },
});

export default GuessAgainModal;