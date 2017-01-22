import React = require('react');
import ReactDOM =require('react-dom');
import {observer} from 'mobx-react';
import actions from '../actions';

const ENTER_KEY = 13;

@observer
export default class TodoEntry extends React.Component<{}, {}> {
	render() {
		return (<input
			ref="newField"
			className="new-todo"
			placeholder="What needs to be done?"
			onKeyDown={this.handleNewTodoKeyDown}
			autoFocus={true}
		/>);
	}

	handleNewTodoKeyDown = (event: any) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		const input = (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement);
		var val = input.value.trim();

		if (val) {
			actions.addTodo(val);
			input.value = '';
		}
	};
}
