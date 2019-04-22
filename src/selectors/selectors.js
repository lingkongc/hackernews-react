export const getStories = function (state) {
    // 判断条件很重要，否则会出错 无法获取到hits
    const searchState = state.searchState;
    const searchKey = searchState.searchKey;
    const stories = (searchState.results
        && searchState.results[searchKey]
        && searchState.results[searchKey].hits) || []
    return stories;
}