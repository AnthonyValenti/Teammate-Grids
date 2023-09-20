import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';


function LoginPage({ navigation }: any){

const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');


  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text1}>Teammate Grids</Text>
        <View style={styles.spacer}></View>
        <TextInput style={styles.input} 
            placeholderTextColor='lightgrey' 
            placeholder='username'
            value={username}
            onChangeText={(userText)=>{
                setUsername(userText);
            }}
            
        />
        <TextInput style={styles.input} 
            placeholderTextColor='lightgrey' 
            placeholder='password'
            value={password}
            onChangeText={(passText)=>{
                setPassword(passText);
            }}
            secureTextEntry={true}
        />
        <View style={styles.spacer}></View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.replace('Teammate Grid')}>
            <Text style={styles.text2}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text2}>Register</Text>
        </TouchableOpacity>
      </View>
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
    spacer:{
        marginBottom:'20%'
    },
    container2: {
        flex: 1,
        marginTop: '5%',
        backgroundColor: 'dimgrey',
        marginBottom: '5%',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
        width: '30%',
        height: '50%',
        shadowColor:'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        opacity: 0.8,
      },
      text1:{
        marginTop: '5%',
        fontWeight: '900',
        fontSize: 35,
        color: 'white'
      },
      text2:{
        fontWeight: '900',
        fontSize: 14,
        color: 'white'
      },
      input:{
        padding: 10,
        marginTop: '10%',
        width:'80%',
        height:'8%',
        backgroundColor: 'white',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 18,        
        shadowColor:'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      button:{
        padding: 10,
        marginTop: '5%',
        width:'40%',
        height:'6%',
        alignItems: 'center',
        backgroundColor: 'orangered',
        borderRadius: 10,     
        shadowColor:'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        opacity: 0.8,
      }
  
  });


export default LoginPage;
