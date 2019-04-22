import React from 'react';
import './index.css';

const Story = ({story}) => {
    const {
        title,
        url,
        author,
        num_comments,
        points
    } = story;
    return (
        <div className="story">
            <span className="story-title">
                <a href={url}>{title}</a>
            </span>
            <span className="story-author">{author}</span>
            <span className="story-comments">{num_comments}</span>
            <span className="story-points">{points}</span>
        </div>
    );
}

export default Story;