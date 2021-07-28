import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    LogBox,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import Colors from 'react-native/Libraries/NewAppScreen/components/Colors';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import actions from '../action';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import Toast from 'react-native-easy-toast';

const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const PAGE_SIZE = 10;
export default class TrendingPage extends Component {

    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs(true);
        this.tabNames = ['All', 'C', 'C#', 'PHP', 'JavaScript'];

    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item}/>,
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
            title={'趋势'}
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

class TrendingTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this._loadData();
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this._renderItem(data)}
                    keyExtractor={item => '' + (item.id || item.fullName)}
                    refreshControl={
                        <RefreshControl refreshing={store.isLoading || false} title={'Loading'} titleColor={THEME_COLOR}
                                        colors={[THEME_COLOR]} onRefresh={() => this._loadData()}
                                        tintColor={THEME_COLOR}/>
                    }
                    ListFooterComponent={() => this._genIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this._loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);

                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true;
                    }}
                />
                <Toast ref={'toast'} position={'center'}/>
            </View>
        );
    }

    _genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text style={styles.labelStyle}>正在加载更多</Text>
            </View>;
    }

    _renderItem(data) {
        const item = data.item;
        return <TrendingItem item={item}/>;
    }

    _loadData(loadMore = false) {
        const {onLoadTrendingData, onLoadMoreTrending} = this.props;
        const url = this._genFetchUrl(this.storeName);
        const store = this._store();
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else {
            onLoadTrendingData(this.storeName, url, PAGE_SIZE);
        }
    }

    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],
                hideLoadingMore: true,
            };
        }
        return store;
    }

    _genFetchUrl(key) {
        return URL + key + '?' + 'since=daily';
    }
}

const mapStateToProps = state => ({
    trending: state.trending,
});

const mapDispatchToProps = dispatch => ({
    onLoadTrendingData: (storeName, url, pageSize) => dispatch(actions.onLoadTrendingData(storeName, url, pageSize)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callback)),
});

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

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
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
});

