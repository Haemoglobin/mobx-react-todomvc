import React = require('react');
import ReactDOM =require('react-dom');
import {observer} from 'mobx-react';
import {action} from 'mobx';
import State, {Todo} from '../state/state';
import * as Utils from '../utils';

const ENTER_KEY = 13;
const state = State.getState();

@observer
export default class TodoEntry extends React.Component<{}, {}> {
	render() {
		return (
			<input
				ref="newField"
				className="new-todo"
				placeholder="What needs to be done?"
				onKeyDown={this.handleNewTodoKeyDown}
				autoFocus={true}
			/>
		);
	}

	@action
    addTodo (title: string) {
		state.todos.push(new Todo(Utils.uuid(), title, false));
	}

	handleNewTodoKeyDown = (event: any) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		const input = (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement);
		var val = input.value.trim();

		if (val) {
			this.addTodo(val);
			input.value = '';
		}
	};
}
