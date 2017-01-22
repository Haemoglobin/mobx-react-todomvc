import {action} from 'mobx';
import State from './state';
import Todo from './models/todo'
import * as Utils from './utils';
const state = State.getState();

class Actions {
    @action
    addTodo (title: string) {
		state.todos.push(new Todo(Utils.uuid(), title, false));
	}

    @action
	toggleAll (checked: boolean) {
		state.todos.forEach(todo => todo.completed = checked);
	}

    @action
	removeTodo(todoToRemove: Todo) {
		state.todos = state.todos.filter(todo => todo.id !== todoToRemove.id);
	}

    @action
	clearCompleted () {
		state.todos = state.todos.filter(todo => !todo.completed);
	}

    @action
    toggle(todo: Todo) {
		todo.completed = !todo.completed;
	}

    @action
	setTitle(todo: Todo, title: string) {
		todo.title = title;
	}
}

export default new Actions();
