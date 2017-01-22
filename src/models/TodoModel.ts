import {observable} from 'mobx';
import TodoStore from '../stores/TodoStore';
export default class TodoModel {
	store: TodoStore;
	id: string;
	@observable title: string;
	@observable completed: boolean;

	constructor(store: TodoStore, id: string, title: string, completed: boolean) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.removeTodo(this);
	}

	setTitle(title: string) {
		this.title = title;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJS(store: TodoStore, object: TodoModel) {
		return new TodoModel(store, object.id, object.title, object.completed);
	}
}
