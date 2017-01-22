import React = require('react');
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import State from '../state';
import TodoItem from './todo-item';
import Todo from '../models/todo';
import actions from '../actions';
const state = State.getState();
@observer
export default class TodoOverview extends React.Component<{}, {}> {
	render() {
		if (state.todos.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={state.activeTodoCount === 0}
			/>
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
					/>)
				)}
			</ul>
		</section>
	}

	getVisibleTodos(): any[] {
		return state.todos.filter((todo) => {
			switch (state.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
	}

	toggleAll = (event: any) => {
		var checked = event.target.checked;
		actions.toggleAll(checked);
	};
}
