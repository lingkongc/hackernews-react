import axios from "axios";
import {
    SEARCH_CHANGE,
    POSTS_ERROR,
    POSTS_RECEIVE,
    POSTS_REQUEST
} from "../constants/actionTypes";

import {
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    DEFAULT_HPP
} from '../api/api'

// 输入改变
export const doChangeSearch = searchTerm => ({
    type: SEARCH_CHANGE,
    searchTerm
});

// 发送请求
const doRequestPosts = searchTerm => ({
    type: POSTS_REQUEST,
    searchTerm,
    isLoading: true
});

// 接收请求
const doReceivePosts = (searchTerm, data) => ({
    type: POSTS_RECEIVE,
    searchTerm,
    results: data
});

// 请求错误
const doErrorPosts = e => ({
    type: POSTS_ERROR,
    error: e,
})

// 发起异步请求
const doFetchPosts = searchTerm => dispatch => {
    dispatch(doRequestPosts(searchTerm));
    axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${0}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(response => response.data)
        .then(data => dispatch(doReceivePosts(searchTerm, data)))
        .catch(e => {
            console.log(e.message);
            dispatch(doErrorPosts(e))
        })
};

// 判断是否需要发起请求
const shouldFetchPosts = (state, searchTerm) => {
    const {
        results,
        isLoading
    } = state.searchState;
    if (!results[searchTerm]) {
        return true;
    } else if (isLoading) {
        return false;
    } else {
        return false;
    }
}

// 如果需要则发送请求
export const fetchPostsIfNeeded = searchTerm => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), searchTerm)) {
        dispatch(doFetchPosts(searchTerm));
    }
}