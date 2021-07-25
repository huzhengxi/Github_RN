import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default class FetchDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={text => this.searchText = text}
                        style={styles.textInput}
                    />
                    <Button title={'获取'} onPress={() => {
                        this._loadData();
                    }}/>
                </View>
                <Text style={[styles.text, {marginTop: 10}]}>
                    {this.state.searchResult}
                </Text>
            </View>
        );
    }

    _loadData() {
        const url = `https://api.github.com/search/repositories?q=${this.searchText}`;
        fetch(url).then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.')
        }).then(responseText => {
            this.setState({
                searchResult: responseText,
            });
        }).catch(error=>{
            this.setState({
                searchResult: error.toString(),
            })
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 12,
        borderWidth: 1,
        borderColor: 'black',
        flex: 1,
        height: 50,
        margin: 10,
    },
    text: {
        flex: 1,
        fontSize: 13,
        color: 'black',
        margin: 10,
    },
});

