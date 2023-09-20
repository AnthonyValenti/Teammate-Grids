import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import allNames from '../assets/allNames';

interface SearchModalProps {
  playerName1: string | null;
  playerName2: string | null;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (searchText: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({playerName1,playerName2, isVisible, onClose, onSubmit }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>(['']);
  const [suggestionVisible, setSuggestionVisible] = useState<boolean>(false);

  const handleSubmit = () => {
    onSubmit(searchText);
    setSuggestionVisible(false);
    setSearchText("");
    onClose();
  };

  useEffect(() => {
    const filteredSuggestions = allNames.filter((name: string) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [searchText]);



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
              setSuggestionVisible(false);
              setSearchText('');
              onClose();
            }}
             style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{playerName1} - {playerName2}</Text>
          <TextInput
            placeholder="Search..."
            value={searchText}
            onChangeText={(newText)=>{
              setSearchText(newText)
              setSuggestionVisible(true)
            }}
            style={styles.input}
          />
          {suggestionVisible && (
            <TouchableOpacity onPress={() => {
              setSearchText(suggestions[0]);
              setSuggestionVisible(false);
            }
          } style={styles.suggestionBox}><Text>{suggestions[0]}</Text></TouchableOpacity>
          )}
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
    height: '30%',
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
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 5,
    fontWeight: 'bold',
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
  suggestionBox:{
    width: '100%',
    height: '20%',
    padding: 10,
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: 'gray',
    marginBottom: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    fontWeight: 'bold',

  }
});

export default SearchModal;
