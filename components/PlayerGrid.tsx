import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Image } from 'react-native';
import SearchModal from './SearchModal';
import RefreshComponent from './RefreshComponent';
import axios from 'axios';
import GuessAgainModal from './GuessAgainModal';
import GameOverModal from './GameOverModal';


const PlayerGrid: React.FC = ({ navigation, route }: any) => {
  const [playerNames, setPlayerNames] = useState<string[][]>([['', ''], ['', '']]);
  const [solutions, setSolutions] = useState<string[][]>([['', ''], ['', '']]);
  const [remainingGuesses, setRemainingGuesses] = useState<number>(4);
  const [enteredNames, setEnteredNames] = useState<string[][]>([['', ''], ['', '']]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedCol, setSelectedCol] = useState<number>(0);
  const [playerName1, setPlayerName1] = useState<string | null>(null);
  const [playerName2, setPlayerName2] = useState<string | null>(null);
  const initialCellColors: string[][] = [['white', 'white'], ['white', 'white']];
  const [cellColors, setCellColors] = useState<string[][]>(initialCellColors);
  const [refreshingPlayers, setRefreshingPlayers] = useState<boolean>(true);
  const [isClickable, setIsClickable] = useState<string[][]>([['true', 'true'], ['true', 'true']]);
  const [guessedNames, setGuessedNames] = useState<string[]>(['']);
  const [guessAgainModal, setGuessAgainModal] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameDone, setGameDone] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(route.params.user);
  //const [username, setUsername] = useState<string>('anthony');


  //this is a temporary test method
  const checkAnswer = (row: number, col: number, searchText: string) => {
    if (guessedNames.includes(searchText)) {
      setGuessAgainModal(true);
    }
    else {
      enteredNames[selectedRow - 1][selectedCol - 1] = searchText;
      guessedNames.push(searchText)
      setEnteredNames(enteredNames);
      setGuessedNames(guessedNames)
      setRemainingGuesses(remainingGuesses - 1);
      isClickable[row - 1][col - 1] = 'false';
      setIsClickable(isClickable);
      //Correct
      if (solutions[row - 1][col - 1].includes(searchText)) {
        const newColors = [...cellColors];
        newColors[row - 1] = [...cellColors[row - 1]];
        newColors[row - 1][col - 1] = 'rgba(0, 128, 0, 0.5)';
        handdleScore(searchText)
        setCellColors(newColors);

      }
      //Incorect
      else {
        const newColors = [...cellColors];
        newColors[row - 1] = [...cellColors[row - 1]];
        newColors[row - 1][col - 1] = 'rgba(255, 0, 0, 0.5)';
        setCellColors(newColors);
      }

    }

  }

  const handdleScore = async (player: string) => {
    try {
      const data = {
        name: player
      }
      const response = await axios.post('https://teammate-grids-server.onrender.com/points', data);
      const newScore = score + response.data.mult;
      setScore(newScore);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePastScores = () => {
    navigation.replace('Scores', { user: username })

  }

  const saveScore = async (currentScore: number) => {
    try {
      const data = {
        username: username,
        score: currentScore
      }
      const response = await axios.post('https://teammate-grids-server.onrender.com/savePoints', data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (remainingGuesses == 0) {
      saveScore(score);
      setGameDone(true);

    }
  }, [remainingGuesses]);

  useEffect(() => {
    getPlayerNames().then((response) => {
      playerNames[0][0] = response.rowPlayer1;
      playerNames[1][0] = response.colPlayer1;
      playerNames[0][1] = response.rowPlayer2;
      playerNames[1][1] = response.colPlayer2;

      solutions[0][0] = response.solution0_0;
      solutions[1][0] = response.solution1_0;
      solutions[0][1] = response.solution0_1;
      solutions[1][1] = response.solution1_1;
      setPlayerNames(playerNames);
      setSolutions(solutions)
      setRefreshingPlayers(false);
      setGuessedNames(['']);

    });
  }, []);

  const handleRefreshClick = () => {
    setEnteredNames([['', ''], ['', '']]);
    setCellColors([['white', 'white'], ['white', 'white']]);
    setRemainingGuesses(4);
    setIsClickable([['true', 'true'], ['true', 'true']])
    getPlayerNames().then((response) => {
      playerNames[0][0] = response.rowPlayer1;
      playerNames[1][0] = response.colPlayer1;
      playerNames[0][1] = response.rowPlayer2;
      playerNames[1][1] = response.colPlayer2;

      solutions[0][0] = response.solution0_0;
      solutions[1][0] = response.solution1_0;
      solutions[0][1] = response.solution0_1;
      solutions[1][1] = response.solution1_1;
      setPlayerNames(playerNames);
      setSolutions(solutions)
      setRefreshingPlayers(false);
      setGuessedNames(['']);
      setScore(0);
      console.log(response)
    });
  };

  const getPlayerNames = async () => {
    setRefreshingPlayers(true);
    try {
      const response = await axios.get('https://teammate-grids-server.onrender.com/playerNames');
      return (response.data);
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

  const closeModalGameDone = () => {
    setGameDone(false);
  };


  const handleSearchSubmit = async (searchText: string) => {
    checkAnswer(selectedRow, selectedCol, searchText);
  };


  const handleCellClick = (row: number, col: number) => {
    if (isClickable[row - 1][col - 1] == 'true') {
      setSelectedRow(row);
      setSelectedCol(col);
      setPlayerName1(playerNames[0][row - 1]);
      setPlayerName2(playerNames[1][col - 1]);
      setIsModalVisible(true);
    }


  };

  const renderTableCell = (row: number, col: number) => {
    return (
      <>
        {row - 1 === 0 && col - 1 === 0 ? (
          <TouchableOpacity
            style={[styles.cell, { backgroundColor: cellColors[row - 1][col - 1], borderTopLeftRadius: 15 }]}
            onPress={() => handleCellClick(row, col)}
          >
            <Text style={styles.text}>{enteredNames[row - 1][col - 1]}</Text>
          </TouchableOpacity>
        ) : row - 1 === 1 && col - 1 === 0 ? (
          <TouchableOpacity
            style={[styles.cell, { backgroundColor: cellColors[row - 1][col - 1], borderBottomLeftRadius: 15 }]}
            onPress={() => handleCellClick(row, col)}
          >
            <Text style={styles.text}>{enteredNames[row - 1][col - 1]}</Text>
          </TouchableOpacity>
        ) : row - 1 === 0 && col - 1 === 1 ? (
          <TouchableOpacity
            style={[styles.cell, { backgroundColor: cellColors[row - 1][col - 1], borderTopRightRadius: 15 }]}
            onPress={() => handleCellClick(row, col)}
          >
            <Text style={styles.text}>{enteredNames[row - 1][col - 1]}</Text>
          </TouchableOpacity>
        ) : row - 1 === 1 && col - 1 === 1 ? (
          <TouchableOpacity
            style={[styles.cell, { backgroundColor: cellColors[row - 1][col - 1], borderBottomRightRadius: 15 }]}
            onPress={() => handleCellClick(row, col)}
          >
            <Text style={styles.text}>{enteredNames[row - 1][col - 1]}</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../assets/logos.jpg')}
        style={styles.backgroundImage}
      />
      <SearchModal
        playerName1={playerName1}
        playerName2={playerName2}
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleSearchSubmit}
      />
      <GuessAgainModal isVisible={guessAgainModal} onClose={closeModalGuessAgain} />
      <GameOverModal score={score} isVisible={gameDone} onClose={closeModalGameDone} />
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

        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>Guesses </Text>
          <Text style={styles.textValue}>{remainingGuesses} </Text>
          <Text style={styles.textHeader}>Score </Text>
          <Text style={styles.textValue}>{score}</Text>
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={refreshingPlayers}
      >
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.textLoading}>Loading players...</Text>
        </View>
      </Modal>
      <View style={styles.bottomButtonsContainer}>
        <RefreshComponent onPress={handleRefreshClick} />
        <TouchableOpacity style={styles.pastScoresButton} onPress={handlePastScores}>
          <Text style={styles.scoresButtonText}>Past Scores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
  },
  container: {
    flexDirection: 'row',
  },

  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
    marginTop: '2%',
    height: '8%',
    width: '20%'
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  textLoading: {
    fontWeight: '900',
    fontSize: 25,
    color: 'white',
  },
  textContainer: {
    marginLeft: '20%',
    marginTop: '20%',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '900',
    color: 'black',
  },
  textValue: {
    fontSize: 35,
    fontWeight: '900',
    marginBottom: '80%',
    color: 'darkblue',
  },
  players: {
    flex: 1,
    height: 100,
    width: 150,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginRight: 5,
  },
  refreshIndicator: {
    justifyContent: 'center'
  },
  loadingModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pastScoresButton: {
    backgroundColor: 'orangered',
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: '20%',
    height: '100%',
    width: '50%',
  },
  scoresButtonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.05,
  },
});

export default PlayerGrid;
