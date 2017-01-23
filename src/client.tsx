import State from './state/state';
import React = require('react');
import ReactDOM = require('react-dom');
import load from './load';
import {useStrict, action} from 'mobx';
const initialState = (window as any).initialState && JSON.parse((window as any).initialState) || {};
useStrict(true);
action(() => State.setState(initialState.todos || []));

const rootElement = document.getElementById('todoapp');
// necessary for hot reloading
let render = () => {
	const TodoApp = require('./components/todo-app').default;
	ReactDOM.render(
		<TodoApp />,
		rootElement
	);
};

if ((module as any).hot) {
	const renderApp = render;
	const renderError = (error: any) => {
		const RedBox = require('redbox-react');
		ReactDOM.render(
			<RedBox error={error} />,
			rootElement
		);
	};
	render = () => {
		try {
			renderApp();
		} catch (error) {
			renderError(error);
		}
	};
	(module as any).hot.accept('./components/todo-app', () => {
		setTimeout(render);
	});
}

render();
load.init();
