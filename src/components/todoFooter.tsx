import React = require('react');
import {observer} from 'mobx-react';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

interface Props {
	viewStore: any; 
	todoStore: any;
}

@observer
export default class TodoFooter extends React.Component<Props, {}> {
	render() {
		const todoStore = this.props.todoStore;
		if (!todoStore.activeTodoCount && !todoStore.completedCount)
			return null;

		const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					{this.renderFilterLink(ALL_TODOS, "", "All")}
					{this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
					{this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
				</ul>
				{ todoStore.completedCount === 0
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
				className={filterName ===  this.props.viewStore.todoFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}

	clearCompleted = () => {
		this.props.todoStore.clearCompleted();
	};
}
