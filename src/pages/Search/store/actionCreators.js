import {
    SEARCH_CHANGE,
    POSTS_REQUEST,
    POSTS_FAILURE,
    POSTS_RECEIVE,
    SET_SEARCHKEY,
    STORY_DISMISS,
} from './actionTypes';

import axios from 'axios';

import {
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    DEFAULT_HPP
} from "../../../constants/API";

export const doChangeSearch = (searchTerm) => ({
    type: SEARCH_CHANGE,
    searchTerm
});

const doReceivePosts = (data) => ({
    type: POSTS_RECEIVE,
    data,
});

const doError = (e) => ({
    type: POSTS_FAILURE,
    error: e
});

const doSearchKeySet = (searchKey) => ({
    type: SET_SEARCHKEY,
    searchKey
});

const doPostsRequest = () => ({
    type: POSTS_REQUEST,
    isLoading: true
});

export const postsRequest = (page = 0) => (dispatch, getState) => {
    // 派发加载
    dispatch(doSearchKeySet(getState().search.searchTerm)); // 将searchKey 设置为 searchTerm
    dispatch(doPostsRequest());
    axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${getState().search.searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(response => response.data)
        .then(result => dispatch(doReceivePosts(result)))
        .catch(e => dispatch(doError(e)));
};


export const doSubmit = (event) => (dispatch, getState) => {
    const {
        searchTerm,
        results
    } = getState().search;
    // 判断是否存在缓存
    if (!results[searchTerm]) {
        // 派发action发送ajax请求
        dispatch(postsRequest());
    }
    event.preventDefault();
};

export const doStoryDismiss = (id) => ({
    type: STORY_DISMISS,
    id
});