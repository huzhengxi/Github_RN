import React, {Component} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import {connect} from 'react-redux';
import actions from  '../action'

 class FavoritePage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    FavoritePage
                </Text>
                <Button title={'修改主题'} onPress={() => this.props.onThemeChange('blue')}/>
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


const mapDispatchToProps  =  dispatch=> ({
    onThemeChange: theme=> dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(FavoritePage)
