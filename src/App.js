import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// Google UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaiseButton from 'material-ui/RaisedButton';

class App extends Component {
    render() {
        const helloworld = "Wlecome to the road to learn react";
        const firstName = "skyorbit";
        const lastName = "lingkong"
        return (
            <div className="App">
                <h2>{helloworld}</h2>
                <p>{firstName + " " + lastName}</p>
                <MuiThemeProvider>
                    <RaiseButton label="Submit" />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
