import {
    INPUT_SUBMIT
} from './actionTypes';

const defaultState = {
    test: '我疯了'
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case INPUT_SUBMIT:
        default:
            return state
    }
}

export default reducer;