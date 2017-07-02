import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducer from './reducers';
import './reset.less';

import NotesApp from './components/NotesApp.jsx';
import About from './components/About.jsx';
import Home from './components/Home.jsx';
import NoteView from './components/NoteView.jsx';

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const history = syncHistoryWithStore(hashHistory, store);

store.subscribe(() => {
	// console.log('subscribe', store.getState());
});

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Router history={history}>
					<Route path="/" component={Home}></Route>
					<Route path="/about" component={About}></Route>
					<Route path="/main" component={NotesApp}></Route>
					<Route path="/main/:id" component={NoteView}></Route>
				</Router>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
};

render(NotesApp);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/NotesApp.jsx', () => {
		render(NotesApp)
	});
}