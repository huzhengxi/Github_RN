import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

const middlewares = [
    thunk,
];

/**
 * 创建Store
 */

export default createStore(reducers, applyMiddleware(...middlewares));
