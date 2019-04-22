import React from 'react';
import './App.css';

import {Provider} from 'react-redux';
import store from '../store'

import Stories from './Stories/';
import Search from './Search/';

const App = () =>
    <Provider store={store}>
        <div className="app">
            <Search/>
            <Stories/>
        </div>
    </Provider>

export default App;