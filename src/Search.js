import React, {Component} from 'react';
import './App.css';

class Search extends Component {
    render() {
        /*
        * this.porps.children 可以将元素从上层传递到你的组价中
        * 为组件相互组合提供了可能性，可以传递其他组件 元素树 元素
        * */
        const {value, onChange, children} = this.props;
        return (
            <form>
                {children}<input
                    type="text"
                    onChange={onChange}
                    value={value}
            />
            </form>
        )
    }
}


export default Search;