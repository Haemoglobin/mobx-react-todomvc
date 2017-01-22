import React = require('react');
import {observer} from 'mobx-react';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import State from '../state';
import actions from '../actions';
const state = State.getState();

@observer
export default class TodoFooter extends React.Component<{}, {}> {
	render() {
		if (!state.activeTodoCount && !state.completedCount)
			return null;

		const activeTodoWord = pluralize(state.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{state.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					{this.renderFilterLink(ALL_TODOS, "", "All")}
					{this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
					{this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
				</ul>
				{ state.completedCount === 0
					? null
					: 	<button
							className="clear-completed"
							onClick={this.clearCompleted}>
							Clear completed
						</button>
				}
			</footer>
		);
	}

	renderFilterLink(filterName: string, url: string, caption: string) {
		return (<li>
			<a href={"#/" + url}
				className={filterName ===  state.todoFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}

	clearCompleted = () => {
		actions.clearCompleted();
	};
}
