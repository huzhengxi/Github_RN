import PopularPage from '../page/PopularPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingPage from '../page/TrendingPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {Component} from 'react';
import {LogBox, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
};

class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs(true); //关闭黄色告警
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        PopularPage.navigationOptions.tabBarLabel = '最热'; //动态修改tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(
            tabs, {
                tabBarComponent: props => (
                    <TabBarComponent theme={this.props.theme} {...props}/>
                ),
            },
        ));

    }

    render() {
        const TABS = this._tabNavigator();
        return <TABS/>;
    }

}

class TabBarComponent extends Component {
    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}/>;
    }

}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
