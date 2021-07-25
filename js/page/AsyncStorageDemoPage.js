import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageKey = 'AsyncStorageKey';
export default class AsyncStorageDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={text => this.inputText = text}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button title={'存储'} onPress={() => this._doSave()}/>
                    <Button title={'删除'} onPress={() => this.doRemove()}/>
                    <Button title={'获取'} onPress={() => this._getData()}/>
                </View>
                <Text style={[styles.text, {marginTop: 10}]}>
                    {this.state.result}
                </Text>
            </View>
        );
    }


    _doSave() {
        AsyncStorage.setItem(AsyncStorageKey, this.inputText, error => {
            if (!error) {
                Alert.alert('', '保存成功');
            }
        });
    }

    doRemove() {
        AsyncStorage.removeItem(AsyncStorageKey, error => {
            if (!error) {
                Alert.alert('', '移除成功');
            }
        })
    }

    _getData() {
        AsyncStorage.getItem(AsyncStorageKey, (error, result) => {
            if (!error) {
                this.setState({
                    result: result,
                });
                Alert.alert('', '获取数据成功');
            }

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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

