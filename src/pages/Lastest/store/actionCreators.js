import {
    INPUT_CHNAGE,
    INPUT_SUBMIT
} from './actionTypes';

export const doChangeInput = (searchKey) => ({
    type: INPUT_CHNAGE,
    searchKey
})

export const doSubmitInput = (searchKey) => ({
    type: INPUT_SUBMIT,
    searchKey
})