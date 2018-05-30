import React from 'react';
import Button from "./Button";

const Sort = ({
                  sortKey,
                  onSort,
                  children,
                  activeSortKey
              }) => {

    // 利用数组来动态添加类 好吧作者也角色这样很蠢
    const sortClass = ['button-inline'];
    if (sortKey === activeSortKey) {
        sortClass.push('button-active');
    }

    return (
        <Button
            onClick={() => onSort(sortKey)}
            className={sortClass.join(' ')}
        >
            {children}
        </Button>
    )
}

export default Sort;