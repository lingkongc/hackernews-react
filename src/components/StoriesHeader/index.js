import React from 'react';

const Index = ({ columns }) =>
    <div className="stories-header">
        {Object.keys(columns).map(key =>
            <span
                key={key}
                style={{ width: columns[key].width }}
            >
                {columns[key].label}
            </span>
        )}
    </div>

export default Index;