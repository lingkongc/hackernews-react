import {
    INPUT_CHANGE,
    INPUT_SUBMIT,
    LIST_ADD,
    LIST_LOAD,
    LIST_SORT
} from './actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            applyChangeInput(state, action);
        case INPUT_SUBMIT:
        case LIST_SORT:
        case LIST_LOAD:
        case LIST_ADD:
        default:
            return state;
    }
}


function applyChangeInput(state, action) {

}


export default reducer;