import types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 获取最热数据的异步action
 * @param storeName  获取最热模块的类型（例如： C++ java 等）
 * @param url
 * @param pageSize
 */
export function onLoadPopularData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: types.POPULAR_REFRESH,
            storeName,
        });
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.POPULAR_REFRESH_FAIL,
                    storeName,
                    error,
                });
            });
    };
}

/**
 * 加载更多
 * @param storeName
 * @param pageIndex  第几页
 * @param pageSize   每页展示的条数
 * @param dataArray  原始数据
 * @param callback  回调函数，可以通过回调函数来向调用页面通信：比如异常信息展示等
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {  //模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { //已加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray,
                });
            } else {
                //计算本次可载入的最大数据量
                const max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectName: dataArray.slice(0, max),
                });
            }
        }, 200);
    };
}

function handleData(dispatch, storeName, data, pageSize) {
    let fixItem = [];
    if (data && data.data && data.data.items) {
        fixItem = data.data.items;
    }
    dispatch({
        type: types.POPULAR_REFRESH_SUCCESS,
        projectName: pageSize > fixItem.length ? fixItem : fixItem.slice(0, pageSize),
        storeName,
        pageIndex: 1,
    });
}
