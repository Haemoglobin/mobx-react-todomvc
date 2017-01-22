# React + MobX TodoMVC Example

This repository provides a reference implementation of the [TodoMVC](http://todomvc.com) application written using [MobX](https://github.com/mobxjs/mobx), [React](https://facebook.github.io/react) and [Typescript](https://www.typescriptlang.org/).

## Running the example

```
npm install
npm start
open http://localhost:3000
```

The example requires node 4.0 or higher

![TodoMVC](devtools.gif)

## Changing the example

If you are new to MobX, take a look at the [ten minutes, interactive introduction](https://mobxjs.github.io/mobx/getting-started.html) to MobX and React. 
MobX provides a refreshing way to manage your app state by combining mutable data structures with transparent reactive programming.

The state of this app is defined in a single state object, a pattern borrowed from redux.

The project uses hot-reloading so most changes made to the app will be picked automatically.
