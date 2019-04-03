import {
    SEARCH_CHANGE,
    SET_SEARCHKEY,
    POSTS_REQUEST,
    POSTS_RECEIVE,
    POSTS_FAILURE, STORY_DISMISS
} from './actionTypes';

import {DEFAULT_QUERY} from '../../../constants/API';

const defaultState = {
    results: {},
    searchKey: '',
    searchTerm: DEFAULT_QUERY,
    error: null,
    isLoading: false
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        // 搜索框内容改变
        case SEARCH_CHANGE:
            return applySearchChange(state, action);
        // 设置searchKey
        case SET_SEARCHKEY:
            return applySetSearchKey(state, action);
        // 发送请求
        case POSTS_REQUEST:
            return applyPostsRequest(state, action);
        // 接收请求
        case POSTS_RECEIVE:
            return applyPostsReceive(state, action);
        case POSTS_FAILURE:
            return applyPostsFailure(state, action);
        case STORY_DISMISS:
            return applyStroyDismiss(state, action);
        default:
            return state;
    }
};

function applyPostsFailure(state, action) {
    return {
        ...state,
        error: action.error
    }
}

function applySearchChange(state, action) {
    return {
        ...state,
        searchTerm: action.searchTerm
    }
}

function applyPostsRequest(state, action) {
    return {
        ...state,
        isLoding: action.isLoding
    }
}

function applySetSearchKey(state, action) {
    return {
        ...state,
        searchKey: action.searchKey
    }
}

function applyPostsReceive(state, action) {
    const newState = updateSearchTopStoriesState(action.data.hits, action.data.page, state);
    return newState;
}

// 缓存数据
function updateSearchTopStoriesState(hits, page, prevState) {
    const {
        searchKey,
        results
    } = prevState;

    const oldHits = results && results[searchKey] ?
        results[searchKey].hits
        : [];

    // 将过去的项目和新的项目合并到新的数组
    const updatedHits = [
        ...oldHits,
        ...hits
    ];

    // 返回更新后的state对象
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

function applyStroyDismiss(state, action) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    // 结果为false
    const isNotId = item => item.objectID !== action.id;
    // filter函数遍历数字，传入函数，如果判断是true则保留, 最后返回结果数组，并不会改变原数组
    const updatedHits = hits.filter(isNotId);

    return {
        ...state,
        results: {
            ...results,
            [searchKey]: {hits: updatedHits, page}
        }
    }
}

export default reducer;