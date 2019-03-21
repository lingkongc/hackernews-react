import {combineReducers} from 'redux';
import {reducer as SearchReducer} from './pages/search/store';
import {reducer as LastestReducer} from './pages/search/store';

const reducer = combineReducers({
    search: SearchReducer,
    lastest: LastestReducer
});

export default reducer;