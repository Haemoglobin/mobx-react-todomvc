import React = require('react');
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

interface Props {
	todo: any,
	viewStore: any
}

@observer
export default class TodoItem extends React.Component<Props, any> {
	@observable editText = "";

	render() {
		const {viewStore, todo} = this.props;
		return (
			<li className={[
				todo.completed ? "completed": "",
				expr(() => todo === viewStore.todoBeingEdited ? "editing" : "")
			].join(" ")}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle}
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

	handleSubmit = (event: any) => {
		const val = this.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	};

	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	handleKeyDown = (event: any) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			this.props.viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event: any) => {
		this.editText = event.target.value;
	};

	handleToggle = () => {
		this.props.todo.toggle();
	};
}
