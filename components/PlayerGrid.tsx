import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import SearchModal from './SearchModal';
import RefreshComponent from './RefreshComponent';
import axios from 'axios';
import GuessAgainModal from './GuessAgainModal';


const PlayerGrid: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[][]>([['', ''], ['', '']]);
  const [solutions, setSolutions] = useState<string[][]>([['', ''], ['', '']]);
  const [remainingGuesses,setRemainingGuesses] = useState<number>(4);
  const [enteredNames, setEnteredNames] = useState<string[][]>([['', ''], ['', '']]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedCol, setSelectedCol] = useState<number>(0);
  const [playerName1, setPlayerName1] = useState<string | null>(null);
  const [playerName2, setPlayerName2] = useState<string | null>(null);
  const initialCellColors: string[][] = [['white', 'white'], ['white', 'white']];
  const [cellColors, setCellColors] = useState<string[][]>(initialCellColors);
  const [refreshingPlayers,setRefreshingPlayers] = useState<boolean>(true);
  const [isClickable,setIsClickable] = useState<string[][]>([['true', 'true'], ['true', 'true']]);
  const [guessedNames,setGuessedNames] = useState<string[]>(['']);
  const [guessAgainModal,setGuessAgainModal] = useState<boolean>(false);



  //this is a temporary test method
  const checkAnswer = (row: number, col: number,searchText: string) => {
      if(guessedNames.includes(searchText)){
        setGuessAgainModal(true);
      }
      else{
        enteredNames[selectedRow - 1][selectedCol - 1] = searchText;
        guessedNames.push(searchText)
        setEnteredNames(enteredNames);
        setGuessedNames(guessedNames)
        setRemainingGuesses(remainingGuesses-1);
        isClickable[row-1][col-1]='false';
        setIsClickable(isClickable);
        if(solutions[row-1][col-1].includes(searchText)){
          const newColors=[...cellColors];
          newColors[row - 1] = [...cellColors[row - 1]];
          newColors[row - 1][col - 1] = 'rgba(0, 128, 0, 0.5)';
          setCellColors(newColors);
        }
        else{
          const newColors=[...cellColors];
          newColors[row - 1] = [...cellColors[row - 1]];
          newColors[row - 1][col - 1] = 'rgba(255, 0, 0, 0.5)';
          setCellColors(newColors);
        }
      }

  }

  useEffect(() => {
    getPlayerNames().then((response) => {
      playerNames[0][0]=response.rowPlayer1;
      playerNames[1][0]=response.colPlayer1;
      playerNames[0][1]=response.rowPlayer2;
      playerNames[1][1]=response.colPlayer2;

      solutions[0][0]=response.solution0_0;
      solutions[1][0]=response.solution1_0;
      solutions[0][1]=response.solution0_1;
      solutions[1][1]=response.solution1_1;
      setPlayerNames(playerNames);
      setSolutions(solutions)
      setRefreshingPlayers(false);
      setGuessedNames(['']);
    });
  }, []);

  const handleRefreshClick =() =>{
    setEnteredNames([['', ''], ['', '']]);
    setCellColors([['white', 'white'], ['white', 'white']]);
    setRemainingGuesses(4);
    setIsClickable([['true', 'true'], ['true', 'true']])
    getPlayerNames().then((response)=>{
      playerNames[0][0]=response.rowPlayer1;
      playerNames[1][0]=response.colPlayer1;
      playerNames[0][1]=response.rowPlayer2;
      playerNames[1][1]=response.colPlayer2;

      solutions[0][0]=response.solution0_0;
      solutions[1][0]=response.solution1_0;
      solutions[0][1]=response.solution0_1;
      solutions[1][1]=response.solution1_1;
      setPlayerNames(playerNames);
      setSolutions(solutions)      
      setRefreshingPlayers(false);
      setGuessedNames(['']);
      console.log(response)
    });
  };

  const getPlayerNames = async () => {
    setRefreshingPlayers(true);
    try {
      const response = await axios.get('https://teammate-grids-server.onrender.com/playerNames'); // replace hosted API endpoint
      return(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const closeModalGuessAgain = () => {
    setGuessAgainModal(false);
  };
  

  const handleSearchSubmit = async (searchText: string) => {
    checkAnswer(selectedRow,selectedCol,searchText);
  };


  const handleCellClick = (row: number, col: number) => {
    if (isClickable[row-1][col-1]=='true'){
      setSelectedRow(row);
      setSelectedCol(col);
      setPlayerName1(playerNames[0][row - 1]);
      setPlayerName2(playerNames[1][col - 1]);
      setIsModalVisible(true);
    }


  };

  const renderTableCell = (row: number, col: number) => {
    return (
      <TouchableOpacity
        style={[styles.cell, { backgroundColor: cellColors[row - 1][col - 1] }]}
        onPress={() => handleCellClick(row, col)}
      >
        <Text style={styles.text}>{enteredNames[row - 1][col - 1]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SearchModal
        playerName1={playerName1}
        playerName2={playerName2}
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleSearchSubmit}
      />
      <GuessAgainModal isVisible={guessAgainModal} onClose={closeModalGuessAgain}/>
      <View style={styles.container}>
        <View>
          <View style={styles.container}>
            <Text style={styles.players} />
            <Text style={styles.players}>{playerNames[1][0]}</Text>
            <Text style={styles.players}>{playerNames[1][1]}</Text>
          </View>

          <View style={styles.container}>
           <Text style={styles.players}>{playerNames[0][0]}</Text>
            {renderTableCell(1, 1)}
            {renderTableCell(1, 2)}
          </View>

          <View style={styles.container}>
            <Text style={styles.players}>{playerNames[0][1]}</Text>
            {renderTableCell(2, 1)}
            {renderTableCell(2, 2)}
          </View>

          <RefreshComponent onPress={handleRefreshClick} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text2}>Guesses: {remainingGuesses}/4</Text>
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={refreshingPlayers}
      >
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>Loading players...</Text>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: '22%',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height:200,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  text2:{
    fontSize: 18,
    fontWeight: '900',
  },
  players: {
    flex: 1,
    height: 100,
    width: 150,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginRight: 5,
  },
  refreshIndicator:{
    justifyContent: 'center'
  },
  loadingModal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }

});

export default PlayerGrid;
