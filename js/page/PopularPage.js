import React, {Component} from 'react';
import {View, StyleSheet, Text, SafeAreaView, LogBox} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';


export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs(true);
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
            PopularTab1: {
                screen: PopularTab,
                navigationOptions: {
                    title: 'tab1',
                },

            },
            PopularTab2: {
                screen: PopularTab,
                navigationOptions: {
                    title: 'tab2',
                },
            },
        }, {}));
        return (
            <SafeAreaView style={styles.container}>
                <TabNavigator/>
            </SafeAreaView>
        );
    }

}

class PopularTab extends Component {
    render() {
        return <View>
            <Text style={styles.welcome}>PopularTab</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        color: Colors.dark,
    },
});
