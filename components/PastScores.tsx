import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';




const PastScores: React.FC = ({ navigation, route }: any) => {
    const [scores, setScores] = useState<string[][]>([['']]);
    const [username,setUsername] = useState<string>('anthony');



    const getScores = async (username: string) => {
        try {
            const data = {
                name: username,
            };
            const response = await axios.post('https://teammate-grids-server.onrender.com/scores', data); // replace hosted API endpoint
            setScores(response.data.scores);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleGoBack = () =>{
        navigation.replace('Teammate Grid', {user: username})
    }

    useEffect(() => {
        getScores(username);
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.text1}>Past Games</Text>
                <ScrollView style={styles.containerTable}>
                    <View style={styles.textView1}>
                        <Text style={styles.textItemHeader}>
                            Score
                        </Text>
                        <Text style={styles.textItemHeader}>
                            Date
                        </Text>
                    </View>
                    {scores.map((row) => (
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>
                                {row[1]}
                            </Text>
                            <Text style={styles.textItem}>
                                {row[2]}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
              <Text style={styles.goBackText}>Return to Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'lightgrey',
        opacity: 0.8,
    },
    container2: {
        flex: 1,
        marginTop: '5%',
        backgroundColor: 'dimgrey',
        marginBottom: '5%',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
        width: '40%',
        height: '50%',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        opacity: 0.9,
    },
    text1: {
        marginTop: '5%',
        fontWeight: '900',
        fontSize: 35,
        color: 'white'
    },
    containerTable: {
        flex: 1,
        padding: 16,
        width: '100%',
    },
    textView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textView1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    textItem: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: '10%',

    },
    textItemHeader: {
        fontSize: 20,
        color: 'white',
        fontWeight: '900',
        marginBottom: '10%',

    },
    goBackButton: {
        backgroundColor: 'blue', 
        borderRadius: 15,
        height: '5%',
        width: '15%',
        marginBottom: '5%',
        justifyContent: 'center',
      },
      goBackText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },

});

export default PastScores;