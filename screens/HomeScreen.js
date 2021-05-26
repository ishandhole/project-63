import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            isSearchPressed: '',
            word: '', definition: '', phonetics: ''
        }
    }
    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + "json"
        return fetch(url).then((data) => {
            if (data.status === 200) {
                return data.json()
            }
            else {
                return null
            }
        })
            .then((response) => {
                var responseObject = response

                if (responseObject) {
                    var wordData = responseObject.definitions[0];
                    var definition = wordData.description;
                    var lexicalCategory = wordData.wordtype;

                    this.setState({
                        "word": this.state.text,
                        "definition": definition,
                        "lexicalCategory": lexicalCategory
                    })
                } else {
                    this.setState({
                        "word": this.state.text,
                        "definition": "Not Found",
                    })
                }

            })

    }

    render() {
        return (
            <SafeAreaProvider>
                <Header
                    backgroundColor={'blue'}
                    centerComponent={{
                        text: 'Dictionary App',
                        style: { color: 'yellow', fontSize: 20, fontWeight: "bold", fontFamily: "cursive" },
                    }}></Header>

                <TextInput
                    style={styles.searchbox}
                    placeholder="Enter a word"
                    onChangeText={(text) => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                            word: 'Loading...',
                            lexicalCategory: '',
                            examples: [],
                            definition: '',
                        });
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.searchbutton}
                    onPress={() => {
                        this.setState({ isSearchPressed: true });
                        this.getWord(this.state.text);
                    }}>
                    <Text style={styles.searchtext}>Search</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.wordtext}> Word :{''} </Text>
                    <Text style={{ fontSize: 18 }}> {this.state.word} </Text>
                </View>


                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={styles.definationtext}> Definition :{''} </Text>
                    <Text style={{ fontSize: 18 }}> {this.state.definition} </Text>
                </View>

            </SafeAreaProvider>

        )
    }
}

const styles = StyleSheet.create({
    searchbox: {
        flex: 1,
        border: 'solid',
        color: 'red',
        width: 150,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 80,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        borderRadius: 4,
        fontWeight: 'bold',
        color: "black",
        backgroundColor: "cyan"
    },

    searchbutton: {
        width: 100,
        height: 20,
        border: 'solid',
        marginTop: 30,
        marginLeft: 100,
        padding: 10,
        borderRadius: 3,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    searchtext: {
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'red'
    },
    wordtext: {
        fontStyle: "italic",
        fontWeight: 'bold',
        marginLeft: 20,



    },
    definationtext: {
        fontStyle: "italic",
        fontWeight: 'bold',
        marginLeft: 20,

    }
})


