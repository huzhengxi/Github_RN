import WelcomePage from '../page/WelcomePage';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from '../page/HomePage';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import FetchDemoPage from '../page/FetchDemoPage';
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage';
import DataStoreDemoPage from '../page/DataStoreDemoPage';


const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            headerShown: false, //异常头部
        },
    },
});

const MainNavigator = createStackNavigator({
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                headerShown: false, //异常头部
            },
        },
        FetchDemoPage: {
            screen: FetchDemoPage,
            navigationOptions: {
                headerShown: true,
            },
        },
        AsyncStorageDemoPage: {
            screen: AsyncStorageDemoPage,
            navigationOptions: {
                headerShown: true,
            },
        },
        DataStoreDemoPage: {
            screen: DataStoreDemoPage,
            navigationOptions: {
                headerShown: true,
            },
        },
    },
);

export default createAppContainer(createSwitchNavigator({
        Init: InitNavigator,
        Main: MainNavigator,
    },
    {
        navigationOptions: {
            headerShown: false, //异常头部
        },
    },
));
