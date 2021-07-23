import React, {Component} from 'react';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';

export default class HomePage extends Component {

    render() {
        // Fix DynamicTabNavigator中的页面无法跳转到外层导航器的问题
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>;
    }

}
