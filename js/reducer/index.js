import {combineReducers} from 'redux';
import theme from './theme/index';
import popular from './populer/index';
import trending from './trending/index';

/**
 * 合并 reducer
 * @type {Reducer<CombinedState<{}>>}
 */
const index = combineReducers({
    theme: theme,
    popular: popular,
    trending: trending,
});

export default index;
