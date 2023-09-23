import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';


const { width } = Dimensions.get('window');
const isMobile = width < 768;

function LoginPage({ navigation }: any) {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginErrorShow, setLoginError] = useState<boolean>(false);
    const [registerErrorShow, setRegisterError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        getPlayerNames().then((response) => {
            setLoading(false);

        });
    }, []);

    const getPlayerNames = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://teammate-grids-server.onrender.com/playerNames');
            return (response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const hanleLogin = async () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('https://teammate-grids-server.onrender.com/login', data)
            .then(response => {
                if (response.data.msg == "ok") {
                    setLoginError(false)
                    navigation.replace('Teammate Grid', { user: username })
                } else {
                    setLoginError(true)
                }
            })
            .catch(error => {
                setLoginError(true)
            });
    }

    const handleRegister = async () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('https://teammate-grids-server.onrender.com/register', data)
            .then(response => {
                if (response.data.msg == "ok") {
                    setRegisterError(false)
                    navigation.replace('Teammate Grid', { user: username })
                } else {
                    setRegisterError(true)
                }
            })
            .catch(error => {
                setRegisterError(true)
            });
    }

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="slide"
                visible={isLoading}
            >
                <View style={styles.loadingModal}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.textLoading}>Connecting to server...</Text>
                </View>
            </Modal>
            <Image
                source={require('../assets/logos.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.container2}>
                <Text style={styles.text1}>Teammate Grids</Text>
                <View style={styles.spacer}></View>
                <TextInput style={styles.input}
                    placeholderTextColor='lightgrey'
                    placeholder='username'
                    value={username}
                    onChangeText={(userText) => {
                        setUsername(userText);
                    }}

                />
                <TextInput style={styles.input}
                    placeholderTextColor='lightgrey'
                    placeholder='password'
                    value={password}
                    onChangeText={(passText) => {
                        setPassword(passText);
                    }}
                    secureTextEntry={true}
                />
                <View style={styles.spacer}></View>
                <TouchableOpacity style={styles.button} onPress={() => hanleLogin()}>
                    <Text style={styles.text2}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                    <Text style={styles.text2}>Register</Text>
                </TouchableOpacity>
                {loginErrorShow && (
                    <Text style={styles.errorText}>Error account does not exists!</Text>
                )}
                {registerErrorShow && (
                    <Text style={styles.errorText}>Error username exists already!</Text>
                )}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'lightgrey',
        height: '100%',
        flexWrap: 'wrap',
    },
    spacer: {
        marginBottom: '20%'
    },
    container2: {
        marginTop: '5%',
        backgroundColor: 'midnightblue',
        marginBottom: '5%',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
        width: isMobile ? '80%' : '30%',
        height: isMobile ? '95%' : '80%',
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        flexWrap: 'wrap',
    },
    text1: {
        fontWeight: '900',
        fontSize: 30,
        color: 'white',
        padding: 20,
    },
    text2: {
        fontWeight: '900',
        fontSize: 14,
        color: 'white'
    },
    errorText: {
        fontWeight: '900',
        fontSize: 14,
        color: 'red',
        marginTop: '2%',
        padding: 20,
    },
    input: {
        padding: 10,
        marginTop: '10%',
        width: '80%',
        height: '8%',
        backgroundColor: 'white',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 18,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        flexWrap: 'wrap'
    },
    button: {
        padding: 10,
        marginTop: '5%',
        width: '40%',
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orangered',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        minWidth: '20%',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
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
      textLoading: {
        fontWeight: '900',
        fontSize: 25,
        color: 'white',
      },

});


export default LoginPage;
