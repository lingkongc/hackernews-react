import {combineReducers} from 'redux';
import searchReducer from './searchReducer';


const reducer = combineReducers({
    searchState: searchReducer
})

export default reducer;


