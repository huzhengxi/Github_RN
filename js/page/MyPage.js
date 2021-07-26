import React, {Component} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import {connect} from 'react-redux';
import actions from '../action';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../common/NavigationBar';

const THEME_COLOR = '#678';

class MyPage extends Component {

    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
            }}>
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>;
    }

    getLeftButton(callback) {
        return <TouchableOpacity style={{padding: 8, paddingLeft: 12}} onPress={callback}>
            <Ionicons
                name={'chevron-back-outline'}
                size={26}
                style={{color: 'white'}}/>
        </TouchableOpacity>;
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'default',
        };
        return (
            <View style={styles.container}>
                <NavigationBar title={'我的'} statusBar={statusBar} style={{backgroundColor: THEME_COLOR}}
                               rightButton={this.getRightButton()}
                               leftButton={this.getLeftButton()}
                />
                <Text style={styles.welcome}>
                    MyPage
                </Text>
                <Button title={'修改主题'} onPress={() => this.props.onThemeChange('orange')}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 30,
    },
    welcome: {
        fontSize: 20,
        color: Colors.dark,
    },
});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(null, mapDispatchToProps)(MyPage);
