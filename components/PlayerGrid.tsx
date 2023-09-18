import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchModal from './SearchModal';


const PlayerGrid: React.FC = () => {
    let playerNames: string[][] = [['Connor McDavid','Leon Draisaitl','David Pastrnak'],['Nikita Kucherov','Nathan MacKinnon','Auston Matthews']]
    const initialEnteredNames: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
    const [enteredNames, setEnteredNames] = useState<string[][]>(initialEnteredNames);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number>(0);
    const [selectedCol, setSelectedCol] = useState<number>(0);
    const [playerName1, setPlayerName1] = useState<string | null>(null);
    const [playerName2, setPlayerName2] = useState<string | null>(null);
    const initialCellColors: string[][] = [['white', 'white', 'white'], ['white', 'white', 'white'], ['white', 'white', 'white']];
    const [cellColors, setCellColors] = useState<string[][]>(initialCellColors);

    const checkAnswer = (searchText: string): boolean => {
        //get a list of potential answers for player1,player2 and check if searchText is in this list
        if(searchText=='Barzal'){
            cellColors[selectedRow-1][selectedCol-1]='rgba(0, 128, 0, 0.5)';
            return true;
        }
        cellColors[selectedRow-1][selectedCol-1]='rgba(255, 0, 0, 0.5)';
        return false;
    }


    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleSearchSubmit = (searchText: string) => {
        checkAnswer(searchText);
        enteredNames[selectedRow-1][selectedCol-1]=searchText;
        setEnteredNames(enteredNames);
        console.log(enteredNames);
      };


    const handleCellClick = (row: number, col: number) => {
        setSelectedRow(row);
        setSelectedCol(col);
        setPlayerName1(playerNames[0][row-1])
        setPlayerName2(playerNames[1][col-1])
        setIsModalVisible(true);

      };
    
      const renderTableCell = (row: number, col: number) => {
        return (

          <TouchableOpacity
            key={`${row}-${col}`}
            style={[styles.cell,{backgroundColor: cellColors[row-1][col-1]}]}
            onPress={() => handleCellClick(row, col)}
          >
            <Text style={styles.text}>{enteredNames[row-1][col-1]}</Text>
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
                <Text style={styles.players}/>
                <Text style={styles.players}>{playerNames[1][0]}</Text>
                <Text style={styles.players}>{playerNames[1][1]}</Text>
                <Text style={styles.players}>{playerNames[1][2]}</Text>
            </View>
          {/* Row 1 */}
          <View style={styles.container}>
            <Text style={styles.players}>{playerNames[0][0]}</Text>
            {renderTableCell(1, 1)}
            {renderTableCell(1, 2)}
            {renderTableCell(1, 3)}
          </View>
          
    
          {/* Row 2 */}
          <View style={styles.container}>
            <Text style={styles.players}>{playerNames[0][1]}</Text>
            {renderTableCell(2, 1)}
            {renderTableCell(2, 2)}
            {renderTableCell(2, 3)}
          </View>
    
          {/* Row 3 */}
          <View style={styles.container}>
            <Text style={styles.players}>{playerNames[0][2]}</Text>
            {renderTableCell(3, 1)}
            {renderTableCell(3, 2)}
            {renderTableCell(3, 3)}
          </View>
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
    players:{
      flex: 1,
      height: 100,
      width: 150,    
      fontSize: 20,
      fontWeight: '800',
      textAlign: 'center',
      marginRight: 5,
    },
  
  });

export default PlayerGrid;
