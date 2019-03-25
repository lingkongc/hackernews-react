import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './common/Header';
import Search from './pages/Search';
import Lastest from './pages/Lastest';

import store from './store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Header/>
            <Route exact path="/" component={Search}/>
            <Route path="/lastest" component={Lastest}/>
        </Router>
    // </Provider>
)

export default App;
