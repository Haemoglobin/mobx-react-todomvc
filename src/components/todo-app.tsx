import React = require('react');
import {observer} from 'mobx-react';
import {action} from 'mobx';
let {Router} = require('director');

import TodoEntry from './todo-entry';
import TodoOverview from './todo-overview';
import TodoFooter from './todo-footer';
import State from '../state/state';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import DevTool from 'mobx-react-devtools';

const state = State.getState();

@observer
export default class TodoApp extends React.Component<{}, {}> {
	
	render() {
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry/>
				</header>
				<TodoOverview/>
				<TodoFooter/>
			</div>
		);
	}

	@action
	changeFilter(filter: string) {
		state.todoFilter = filter;
	}

	componentDidMount() {
		var router = Router({
			'/': () => this.changeFilter(ALL_TODOS),
			'/active': () => { this.changeFilter(ACTIVE_TODOS) },
			'/completed': () => { this.changeFilter(COMPLETED_TODOS) }
		});
		router.init('/');
	}
}
