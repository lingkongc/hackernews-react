import {
    INPUT_SUBMIT
} from './actionTypes';


export const doSubmitInput = (searchKey) => ({
    type: INPUT_SUBMIT,
    searchKey
})