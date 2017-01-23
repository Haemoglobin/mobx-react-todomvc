import React = require('react');
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';
import State, {Todo} from '../state/state';
const state = State.getState();
import {action} from 'mobx';
const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

interface Props {
	todo: Todo,
}

@observer
export default class TodoItem extends React.Component<Props, {}> {
	@observable editText = "";

	render() {
		const {todo} = this.props;
		
		let className = [
				todo.completed ? "completed": "",
				expr(() => todo === state.todoBeingEdited ? "editing" : "")
			].join(" ");
		
		return (
			<li className={className}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle.bind(this)}
						/>
					<label onDoubleClick={this.handleEdit.bind(this)}>
						{todo.title}
					</label>
					<button className="destroy" onClick={this.removeTodo.bind(this)} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit.bind(this)}
					onChange={this.handleChange.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
					/>
			</li>
		);
	}

	@action
	removeTodo() {
		state.todoBeingEdited = null;
		state.todos = state.todos.filter(todo => todo.id !== this.props.todo.id);
	}

	@action
    handleToggle() {
		this.props.todo.completed = !this.props.todo.completed;
	}

	@action
	setTitle(todo: Todo, title: string) {
		todo.title = title;
	}

	@action
	editTodo(todo: Todo) {
		state.todoBeingEdited = todo;
	}

	@action
	setText(text: string) {
		this.editText = text;
	}

	handleSubmit(event: any) {
		const val = this.editText.trim();
		if (val) {
			this.setTitle(this.props.todo, val);
			this.setText(val);
		} else {
			this.removeTodo();
		}
		this.editTodo(null);
	};

	handleEdit() {
		let todo = this.props.todo;
		this.editTodo(todo);
		this.setText(todo.title);
	};

	handleKeyDown(event: any) {
		if (event.which === ESCAPE_KEY) {
			this.setText(this.props.todo.title);
			this.editTodo(null);
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange(event: any) {
		this.setText(event.target.value);
	};
}
