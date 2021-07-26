import React, {Component} from 'react';
import {FlatList, LogBox, RefreshControl, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import actions from '../action';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';
import {onLoadMorePopular} from '../action/popular';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const PAGE_SIZE = 10;
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
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        const navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />;
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: '#a67',
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            },
        }));
        return (
            <SafeAreaView style={styles.container}>
                {navigationBar}
                <TabNavigator/>
            </SafeAreaView>
        );
    }

}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this._loadData();
    }

    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
            };
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data => this._renderItem(data)}
                    keyExtractor={item => '' + item.id}
                    refreshControl={
                        <RefreshControl refreshing={store.isLoading} title={'Loading'} titleColor={THEME_COLOR}
                                        colors={[THEME_COLOR]} onRefresh={() => this._loadData()}
                                        tintColor={THEME_COLOR}/>
                    }
                />
            </View>
        );
    }

    _renderItem(data) {
        const item = data.item;
        return <PopularItem item={item}/>;
    }

    _loadData(loadMore = false) {
        const {onLoadPopularData, onLoadMorePopular} = this.props;
        const url = this._genFetchUrl(this.storeName);
        const store = this._store();
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, callback=> {

            })
        } else {
            onLoadPopularData(this.storeName, url, PAGE_SIZE);
        }
    }

    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true,
            };
        }
        return store;
    }

    _genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }
}

const mapStateToProps = state => ({
    popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize) => dispatch(actions.onLoadPopularData(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);


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
        backgroundColor: 'black',
    },
    labelStyle: {
        fontSize: 14,
        marginVertical: 6,
    },
    listItem: {
        marginBottom: 10,
        backgroundColor: 'red',
    },
    listItemText: {
        backgroundColor: '#faa',

    },
});

