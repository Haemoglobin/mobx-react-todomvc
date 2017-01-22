#!/usr/bin/env node
(global as any).__CLIENT__ = false;
(global as any).__SERVER__ = true;

import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
let escape = require('jsesc');
import { renderToString } from 'react-dom/server'

import State from '../src/state';
import TodoApp from '../src/components/todo-app';
import Todo from '../src/models/todo';
import React = require('react');

const app = express();
app.use('/node_modules', express.static(path.resolve('./node_modules')));

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = (html: string) => {
	const initialState = { todos };
	const initialStateJSON = escape( 
		JSON.stringify(initialState),
		{ wrap: true, isScriptContext: true, json: true }
	);
	return `
	<!doctype html>
	<html lang="utf-8">
		<head>
			<link rel="stylesheet" href="/node_modules/todomvc-common/base.css">
			<link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css">
			<script>
				window.initialState = ${initialStateJSON}
			</script>
		</head>
		<body>
			<section id="todoapp" class="todoapp">${html}</section>
			<script src="/static/bundle.js"></script>
			<footer class="info">
				<p>Double-click to edit a todo</p>
			</footer>
		</body>
	</html>
	`
};

let todos: Array<Todo> = []; // Todos are stored here

app.use(bodyParser.json());

app.get('/', function(req: express.Request, res: express.Response) {
	const state = State.setState(todos);

	const initView = renderToString((
		<TodoApp />
	));

	const page = renderFullPage(initView);

	res.status(200).send(page);
});

app.post('/api/todos', function(req: express.Request, res: express.Response) {
	todos = (req as any).body.todos;
	if (Array.isArray(todos)) {
		console.log(`Updated todos (${todos.length})`);
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "expected `todos` to be array" }));
	}
});

app.get('*', function(req: express.Request, res: express.Response) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err: any, req: any, res: any, next: any) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', (evt: any) => {
	console.log('uncaughtException: ', evt);
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
