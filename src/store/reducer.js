import {combineReducers} from 'redux';
import {reducer as SearchReducer} from './pages/Search/store';
import {reducer as LastestReducer} from './pages/Lastest/store';

const reducer = combineReducers({
    search: SearchReducer,
    lastest: LastestReducer
});

export default reducer;