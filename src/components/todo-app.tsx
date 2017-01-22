import React = require('react');
import {observer} from 'mobx-react';
let {Router} = require('director');

import TodoEntry from './todo-entry';
import TodoOverview from './todo-overview';
import TodoFooter from './todo-footer';
import State from '../state';
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

	componentDidMount() {
		var router = Router({
			'/': function() { state.todoFilter = ALL_TODOS; },
			'/active': function() { state.todoFilter = ACTIVE_TODOS; },
			'/completed': function() {  state.todoFilter = COMPLETED_TODOS; }
		});
		router.init('/');
	}
}
