import types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 获取最热数据的异步action
 * @param storeName  获取最热模块的类型（例如： C++ java 等）
 * @param url
 */
export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({
            type: types.POPULAR_REFRESH,
            storeName,
        });
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.LOAD_POPULAR_FAIL,
                    storeName,
                    error,
                });
            });
    };
}

function handleData(dispatch, storeName, data) {
    dispatch({
        type: types.LOAD_POPULAR_SUCCESS,
        items: data && data.data && data.data.items,
        storeName,
    });
}
