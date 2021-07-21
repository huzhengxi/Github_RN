import {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';


export default class MyPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    MyPage
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        color: Colors.dark,
    },
});
