import types from '../../action/types';

const defaultState = {}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,
                    isLoading: false,
                },
            };
        case types.POPULAR_REFRESH:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                },
                isLoading: false,
            };
        default:
            return state;
    }
}