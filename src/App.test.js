import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Index from './components/Search/index';
import Button from './pages/Search/components/Button/Button';
import Index from './pages/Search/components/Table/Table';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });

    test('has v valid snapshot', () => {
        const component = renderer.create(
            <App/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe('Index', () => {
    it('render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Index>Search</Index>, div);
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Index>Search</Index>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe('Button', () => {
    it('render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Give Me More</Button>, div);
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Button>Give Me More</Button>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Index', () => {
    const props = {
        list: [
            {title: '1', author: '1', run_comments: 1, points: 2, objectID: 'y'},
            {title: '1', author: '2', run_comments: 2, points: 2, objectID: 'z'},
        ],
        sortKey: 'TITLE',
        isSockReverse: false,
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Index {...props} />, div);
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Index {...props} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two items in list', () => {
        const element = shallow(
            <Index {...props}/>
        );
        expect(element.find('.table-row').length).toBe(2);
    });
});


