import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store';

export default class App extends Component {
    render() {
        /**
         * 将Store传给App框架
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>;
    }

}
