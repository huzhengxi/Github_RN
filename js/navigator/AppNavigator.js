import WelcomePage from '../page/WelcomePage';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from '../page/HomePage';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';


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
