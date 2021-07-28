import types from '../../action/types';

const defaultState = {};
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case types.TRENDING_REFRESH_SUCCESS: //下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,
                    projectModels: action.projectModels,
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case types.TRENDING_REFRESH: //下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    hideLoadingMore: true,
                    isLoading: true,
                },
            };
        case types.TRENDING_REFRESH_FAIL: //下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: false,
                    isLoading: false,
                },

            };
        case types.TRENDING_LOAD_MORE_SUCCESS: //上拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            };
        case types.TRENDING_LOAD_MORE_FAIL: //上拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                },
            };
        default:
            return state;
    }
}
