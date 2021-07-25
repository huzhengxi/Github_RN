import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import DataStore from '../expand/dao/DataStore';

export default class DataStoreDemoPage extends Component {
    constructor(props) {
        super(props);
        this.dataStore = new DataStore();
        this.state = {
            result: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={text => this.value = text}
                        style={styles.textInput}
                    />
                    <Button title={'获取'} onPress={() => {
                        this._loadData();
                    }}/>
                </View>
                <Text style={[styles.text, {marginTop: 10}]}>
                    {this.state.result}
                </Text>
            </View>
        );
    }

    _loadData() {
        const url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url).then((result) => {
            const {data, timestamp} = result;
            const showData = `获取时间为${new Date(timestamp)} \n${JSON.stringify(data)}`;
            this.setState({
                result: showData,
            });
        }).catch(error => {
            this.setState({
                result: error.toString(),
            });
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

