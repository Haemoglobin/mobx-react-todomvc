import {observable, computed, reaction} from 'mobx';
import Todo from './models/todo'
import { ALL_TODOS } from './constants';

export default class State {
	@observable todoBeingEdited: Todo = null;
	@observable todoFilter = ALL_TODOS;
	@observable todos: Todo[] = [];

	@computed get activeTodoCount() {
		return this.todos.filter(todo => !todo.completed).length;
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	toJS() {
		return this.todos.map(todo => todo.toJS());
	}

	static setState(array: any) {
		state.todos = array.map((item: any) => Todo.fromJS(item));
		return state;
	}

	static getState() {
		return state;
	}
}

const state = new State();
