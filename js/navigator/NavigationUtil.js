export default class NavigationUtil {

    /**
     * 跳转到指定页面
     * @param params  要传递的参数
     * @param page    要跳转的页面名称（页面路由名）
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not null');
            return;
        }
        navigation.navigate(
            page,
            {...params},
        );
    }

    /**
     * 跳转到主页面
     * @param params
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main');
    }
}
