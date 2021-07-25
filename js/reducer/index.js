import {combineReducers} from 'redux';
import theme from './theme/index';
import popular from './populer/index';

/**
 * 合并 reducer
 * @type {Reducer<CombinedState<{}>>}
 */
const index = combineReducers({
    theme: theme,
    popular: popular,
});

export default index;
