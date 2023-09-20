import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import SearchModal from './SearchModal';
import RefreshComponent from './RefreshComponent';
import axios from 'axios';


const PlayerGrid: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[][]>([['', ''], ['', '']]);
  const [enteredNames, setEnteredNames] = useState<string[][]>([['', ''], ['', '']]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedCol, setSelectedCol] = useState<number>(0);
  const [playerName1, setPlayerName1] = useState<string | null>(null);
  const [playerName2, setPlayerName2] = useState<string | null>(null);
  const initialCellColors: string[][] = [['white', 'white'], ['white', 'white']];
  const [cellColors, setCellColors] = useState<string[][]>(initialCellColors);
  const [refreshingPlayers,setRefreshingPlayers] = useState<boolean>(true);


  //this is a temporary test method
  const checkAnswer = async(row: number, col: number,searchText: string): Promise<boolean> => {
    //get a list of potential answers for player1,player2 and check if searchText is in this list
    const postData={"playerNames":[playerName1,playerName2,searchText]};
    try {
      const response = await axios.post('https://teammate-grids-server.onrender.com/validate',postData); // replace hosted API endpoint
      if (response.data.msg == "correct") {
        const newColors=[...cellColors];
        newColors[row - 1] = [...cellColors[row - 1]];
        newColors[row - 1][col - 1] = 'rgba(0, 128, 0, 0.5)';
        setCellColors(newColors);
        return true;
      }
      else{
        const newColors=[...cellColors];
        newColors[row - 1] = [...cellColors[row - 1]];
        newColors[row - 1][col - 1] = 'rgba(255, 0, 0, 0.5)';
        setCellColors(newColors);
        return false;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  }

  useEffect(() => {
    getPlayerNames().then((response) => {
      playerNames[0][0]=response.pairs[0][0];
      playerNames[1][0]=response.pairs[0][1];
      playerNames[0][1]=response.pairs[1][0];
      playerNames[1][1]=response.pairs[1][1];
      setPlayerNames(playerNames);
      setRefreshingPlayers(false);
    });
  }, []);
  const handleRefreshClick =() =>{
    setEnteredNames([['', ''], ['', '']]);
    setCellColors([['white', 'white'], ['white', 'white']]);
    getPlayerNames().then((response)=>{
      playerNames[0][0]=response.pairs[0][0];
      playerNames[1][0]=response.pairs[0][1];
      playerNames[0][1]=response.pairs[1][0];
      playerNames[1][1]=response.pairs[1][1];
      setPlayerNames(playerNames);      
      setRefreshingPlayers(false);
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

  const handleSearchSubmit = async (searchText: string) => {
    checkAnswer(selectedRow,selectedCol,searchText);
    enteredNames[selectedRow - 1][selectedCol - 1] = searchText;
    setEnteredNames(enteredNames);
    console.log(enteredNames);
  };


  const handleCellClick = (row: number, col: number) => {
    setSelectedRow(row);
    setSelectedCol(col);
    setPlayerName1(playerNames[0][row - 1]);
    setPlayerName2(playerNames[1][col - 1]);
    setIsModalVisible(true);

  };

  const renderTableCell = (row: number, col: number) => {
    return (

      <TouchableOpacity
        key={`${row}-${col}`}
        style={[styles.cell, { backgroundColor: cellColors[row - 1][col - 1] }]}
        onPress={() => handleCellClick(row, col)}
      >
        <Text style={styles.text}>{enteredNames[row - 1][col - 1]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <SearchModal
        playerName1={playerName1}
        playerName2={playerName2}
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleSearchSubmit}
      />

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
  container: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
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
