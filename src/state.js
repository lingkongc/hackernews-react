const DEFAULT_QUERY = 'redux';

this.state = {
    results: null, // 存储搜索结果
    searchKey: '',
    searchTerm: DEFAULT_QUERY,
    error: null,    // 页面是否出错
    isLoading: false,  // 列表是否在加载
};

// 新的state结构

this.state = {
    search: {
        results: null,
        searchKey: '',
        searchTerm: DEFAULT_QUERY,
        error: null,
        isLoading: false
    },
    lastest: {
        results: null,
        error: null,
        isLoading: false,
    }
}