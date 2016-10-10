import React = require('react');
import {observer} from 'mobx-react';
import {Router} from 'director';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import DevTool from 'mobx-react-devtools';

interface Props {
	todoStore: any;
	viewStore: any;
}

@observer
export default class TodoApp extends React.Component<Props, {}> {
	render() {
		const {todoStore, viewStore} = this.props;
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoStore={todoStore} />
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore} />
			</div>
		);
	}

	componentDidMount() {
		var viewStore = this.props.viewStore;
		var router = Router({
			'/': function() { viewStore.todoFilter = ALL_TODOS; },
			'/active': function() { viewStore.todoFilter = ACTIVE_TODOS; },
			'/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
		});
		router.init('/');
	}
}
