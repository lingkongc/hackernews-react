import {
    INPUT_CHANGE,
    INPUT_SUBMIT,
    LIST_ADD,
    LIST_LOAD,
    LIST_SORT
} from './actionTypes';

export const doChangeInput = (searchKey) => ({
    type: INPUT_CHANGE,
    searchKey
});

export const doSubmitInput = (searchKey) => ({
    type: INPUT_SUBMIT,
    searchKey
});

export const doAddList = () => ({
    type: LIST_ADD,
});

export const doLoadList = () => ({
    type: LIST_LOAD
});

export const doSortList = () => ({
    type: LIST_SORT
});

