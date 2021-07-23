import {combineReducers} from 'redux';
import theme from './theme/index';

/**
 * 合并 reducer
 * @type {Reducer<CombinedState<{}>>}
 */
const index = combineReducers({
    theme: theme,
});

export default index;
