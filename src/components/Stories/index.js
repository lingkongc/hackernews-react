import React from 'react';
import {connect} from 'react-redux';

import './index.css';
import Story from '../Story/';
import StoriesHeader from '../StoriesHeader/';
import {getStories} from "../../selectors/selectors";

const COLUMNS = {
    title: {
        label: 'Title',
        width: '40%',
    },
    author: {
        label: 'Author',
        width: '30%',
    },
    comments: {
        label: 'Comments',
        width: '10%',
    },
    points: {
        label: 'Points',
        width: '10%',
    },
    archive: {
        label: 'Archive',
        width: '10%',
    },
};


const Stories = ({isLoading, stories}) =>
    <div className="stories">
        <StoriesHeader columns={COLUMNS}/>

        {
            isLoading
                ? <div>Loading</div>
                : (stories || []).map(story =>
                    <Story
                        key={story.objectID}
                        story={story}
                    />
                )
        }
    </div>

const mapStateToProp = state => ({
    isLoading: state.searchState.isLoading,
    stories: getStories(state)
})

export default connect(mapStateToProp)(Stories);