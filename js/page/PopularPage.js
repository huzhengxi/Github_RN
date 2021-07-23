import React, {Component} from 'react';
import {View, StyleSheet, Text, SafeAreaView, LogBox} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';


export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs(true);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP', 'Go', 'C++', 'C'];

    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle:styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: '#a67'
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            }
        }));
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
    tabStyle: {
        minWidth: 30,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'black'
    },
    labelStyle: {
        fontSize: 14,
        marginVertical: 6,
    }
});
