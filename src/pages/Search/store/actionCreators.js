import {
    SEARCH_CHANGE,
    LIST_ADD,
    LIST_LOAD,
    LIST_SORT
} from './actionTypes';

import {
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP
} from "../../constants/API";

export const doChangeSearch = (searchTerm) => ({
    type: SEARCH_CHANGE,
    searchTerm
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

export const doLoading = (isLoading) => ({
    type: IS_LOADING,
    isLoading
})


const doRequestReceive = (data) => ({
    type: REQUEST_RECEIVE,
    data
})

const doError = (e) => ({
    erroe: e
})

const doSearchKeySet = (searchTerm) => ({
    type: SET_SEARCHTERM,
    searchTerm
})

export const doRequestSearchStories = (searchTerm, page = 0) => (dispatch, getState) => {
    // 派发加载
    dispatch(doLoading(getState().isLoading));
    axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(response => response.data)
        .then(result => dispatch(doRequestReceive(result)))
        .catch(e => dispatch(doError(e)));
}


export const doSubmitSearch = (event) => (dispatch, getState) => {
    const {
        searchTerm,
        results
    } = getState();
    dispatch(doSearchKeySet(searchTerm)); // 将searchKey 设置为 searchTerm
    // 判断是否存在缓存
    if (!results[searchTerm]) {
        // 派发action发送ajax请求
        dispatch(doRequestSearchStories(searchTerm, page = 0));
    }
    event.preventDefault(event);
}