import types from '../types';
import DataStore, {FLAG_STORE} from '../../expand/dao/DataStore';
import {handleData} from '../ActionUtil';

/**
 * 获取最热数据的异步action
 * @param storeName  获取最热模块的类型（例如： C++ java 等）
 * @param url
 * @param pageSize
 */
export function onLoadTrendingData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: types.TRENDING_REFRESH,
            storeName,
        });
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORE.flag_trending)
            .then(data => {
                handleData(types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.TRENDING_REFRESH_FAIL,
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
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {  //模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { //已加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModels: dataArray,
                });
            } else {
                //计算本次可载入的最大数据量
                const max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModels: dataArray.slice(0, max),
                });
            }
        }, 500);
    };
}

