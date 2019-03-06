const DEFAULT_QUERY = 'react';  // 默认搜索
const DEFAULT_HPP = '50';   // 加载条数

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PATH_SEARCHBYDATE = '/search_by_date';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_TAG = 'tag=';   //数据类型
const PARAM_MUMERICFILTERS = 'numericFilters='  // 对pont 等数据大小进行过滤
const PARAM_HPP = 'hitsPerPage=';    // 每页的数据的数量

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;


// Examples
// All stories matching foo
// http://hn.algolia.com/api/v1/search?query=foo&tags=story
//     All comments matching bar
// http://hn.algolia.com/api/v1/search?query=bar&tags=comment
//     All URLs matching bar
// http://hn.algolia.com/api/v1/search?query=bar&restrictSearchableAttributes=url
//     All stories that are on the front/home page right now
// http://hn.algolia.com/api/v1/search?tags=front_page
//     Last stories
// http://hn.algolia.com/api/v1/search_by_date?tags=story
//     Last stories OR polls
// http://hn.algolia.com/api/v1/search_by_date?tags=(story,poll)
//     Comments since timestamp X (in second)
// http://hn.algolia.com/api/v1/search_by_date?tags=comment&numericFilters=created_at_i>X
//     Stories between timestamp X and timestamp Y (in second)
// http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>X,created_at_i<Y
//     Stories of pg
// http://hn.algolia.com/api/v1/search?tags=story,author_pg
//     Comments of story X
// http://hn.algolia.com/api/v1/search?tags=comment,story_X