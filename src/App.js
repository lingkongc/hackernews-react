import React, {Component} from 'react';
import './App.css';
// Google UI
import darkbaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaiseButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {cyan500} from 'material-ui/styles/colors';

// 模拟数据
const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/react.js/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

// 自定义样式
const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500,
    },
    appBar: {
        height: 50,
    },
})

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 属性名与变量名一致的时候可以简写
            list,
        };

        // 绑定到类方法
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss(id) {
        // 结果为false
        const isNotId = item => item.objectID !== id;
        // filter函数遍历数字，传入函数，如果判断是true则保留, 最后返回结果数组，并不会改变原数组
        const updatedList = this.state.list.filter(isNotId);
        this.setState({list: updatedList});
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <AppBar title="My AppBar"/>
                <RaiseButton label="Dismiss"/>

                {/*这里箭头函数使用了简洁体*/}
                {this.state.list.map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        {/*删除按钮*/}
                        <span>
                            <button onClick={() => this.onDismiss(item.objectID)} type="button">Dismiss</button>
                        </span>
                    </div>
                )}
            </MuiThemeProvider>
        );
    }
}

export default App;
