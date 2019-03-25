import {
    SEARCH_CHANGE,
    SEARCH_SUBMIT,
    LIST_ADD,
    LIST_SORT,
    IS_LOADING,
    REQUEST_STORIES,
    REQUEST_RECEIVE
} from './actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
        // 搜索框内容改变
        case SEARCH_CHANGE:
            applyChangeSearch(state, action);
            // 提交搜索
        case SEARCH_SUBMIT:
            applySubmitSearch(state)
            // 数据是否加载中 
        case IS_LOADING:
            appleyIsLoading(state, action);
            // 接收到数据
        case REQUEST_STORIES:
            applyReceiveRequest(state, action);
            // 列表排序
        case LIST_SORT:
            // 加载新数据 
        case LIST_ADD:
        default:
            return state;
    }
}


function applyChangeSearch(state, action) {
    return {
        ...state,
        searchItem: action.searchTerm
    };
}

function appleyIsLoading(state, action) {
    return {
        ...state,
        isLoding: action.isLoding
    }
}

function applySubmitSearch(state) {
    return {
        ...state,
        searchKey: state.searchTerm
    }
}

function applyReceiveRequest(state, action) {
    const {
        hits,
        page
    } = action.data;
    return updateSearchTopStoriesState(htis, page, state)
}

function updateSearchTopStoriesState(hits, page, prevState) {
    const {
        searchKey,
        results
    } = prevState;

    const oldHits = results && results[searchKey] ?
        results[searchKey].hits // 存在的话
        :
        [];

    // 将过去的项目和新的项目合并到新的数组
    const updatedHits = [
        ...oldHits,
        ...hits
    ];

    // 返回更新后的state对象
    return {
        // 将新的搜索合并到results，如果存在该对象，则覆盖
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

export default reducer;