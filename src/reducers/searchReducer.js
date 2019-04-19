import {
    SEARCH_CHANGE,
    POSTS_REQUEST,
    POSTS_RECEIVE,
    POSTS_ERROR
} from '../constants/actionTypes';

const initialState = {
    results: '',
    searchKey: '',
    searchTerm: 'redux',
    error: '',
    isLoading: false,
    error: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        // 搜索框改变
        case SEARCH_CHANGE:
            return applyChangeSearch(state, action);
        // 发送请求中
        case POSTS_REQUEST:
            return applyRequestPosts(state, action);
        // 请求成功
        case POSTS_RECEIVE:
            return applyReceivePosts(state, action);
        // 请求失败
        case POSTS_ERROR:
            return applyErrorPosts(state, action);
        default:
            return state;
    }
}

function applyErrorPosts(state,action){
    return {
        ...state,
        error: action.error
    }
}

function applyChangeSearch(state, action) {
    return {
        ...state,
        searchTerm: action.searchTerm
    }
}

function applyRequestPosts(state, action) {
    return {
        ...state,
        isLoading: action.isLoading,
        searchKey: action.searchTerm
    }
}

function applyReceivePosts(state, action) {
    const newState = updateState(action.results.hits, action.results.page, state);
    return newState;
}

function updateState(hits, page, prevState) {
    const {
        searchKey,
        results,
    } = prevState;

    // 如果存在该缓存则取缓存，否则新建数组
    const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : [];

    // 合并新hits
    const updatedHits = [
        ...oldHits,
        ...hits
    ];

    return {
        ...prevState,
        results: {
            ...results,
            [searchKey]: {
                hits: updatedHits,
                page
            }
        },
        isLoading: false
    }
}


export default searchReducer;