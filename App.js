import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import HomeScreen from "./screens/HomeScreen"


export default class App extends React.Component{
  render(){
  return (
    <View>
     <HomeScreen/>
    </View>
  );
}
}


