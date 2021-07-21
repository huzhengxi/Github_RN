import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';

export default class WelcomePage extends Component {
    componentDidMount() {
        this.didWelcomeTimer = setTimeout(() => {
            NavigationUtil.resetToHomePage(this.props);
        }, 1000);
    }

    componentWillUnmount() {
        this.didWelcomeTimer && clearTimeout(this.didWelcomeTimer);
    }


    render() {
        return <View style={styles.container}>
            <Text style={styles.text}>
                Welcome
            </Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
});
