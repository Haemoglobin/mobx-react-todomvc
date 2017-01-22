import {observable} from 'mobx';
export default class Todo {
	id: string;
	@observable title: string;
	@observable completed: boolean;

	constructor(id: string, title: string, completed: boolean) {
		this.id = id;
		this.title = title;
		this.completed = completed;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJS(object: Todo) {
		return new Todo(object.id, object.title, object.completed);
	}
}
