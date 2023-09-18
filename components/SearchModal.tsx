import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface SearchModalProps {
  playerName1: string | null;
  playerName2: string | null;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (searchText: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({playerName1,playerName2, isVisible, onClose, onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = () => {
    onSubmit(searchText);
    setSearchText("");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{playerName1} - {playerName2}</Text>
          <TextInput
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
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
    width: '50%',
    height: '25%',
    backgroundColor: 'white',
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
  input: {
    width: '100%',
    padding: 10,
    marginTop: '10%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text:{
    fontSize: 20,
    fontWeight: '500',

  },
});

export default SearchModal;
