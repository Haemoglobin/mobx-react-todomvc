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
					<label onDoubleClick={this.handleEdit}>
						{todo.title}
					</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					/>
			</li>
		);
	}

	@action
	removeTodo(todoToRemove: Todo) {
		state.todos = state.todos.filter(todo => todo.id !== todoToRemove.id);
	}

	@action
    handleToggle() {
		this.props.todo.completed = !this.props.todo.completed;
	}

	@action
	setTitle(todo: Todo, title: string) {
		todo.title = title;
	}

	handleSubmit = (event: any) => {
		const val = this.editText.trim();
		if (val) {
			this.setTitle(this.props.todo, val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		state.todoBeingEdited = null;
	};

	handleDestroy = () => {
		this.removeTodo(this.props.todo);
		state.todoBeingEdited = null;
	};

	handleEdit = () => {
		const todo = this.props.todo;
		state.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	handleKeyDown = (event: any) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			state.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event: any) => {
		this.editText = event.target.value;
	};
}
