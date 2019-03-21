import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Header from './components/Header';
import Search from './pages/Search';
import Lastest from './pages/Lastest';

const App = () => (
    <Router>
        <Header />
        <Route exact  path="/" component={Search} />
        <Route path="/lastest" component={Lastest} />
    </Router>
)


export default App;
