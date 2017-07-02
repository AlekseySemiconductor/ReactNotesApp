import React from 'react';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';
import Links from './Links.jsx';
import './NotesApp.less';

export default class NotesApp extends React.Component {
	render = () => {
		return (
			<div className="notes-app">
				<Links />
				<h2 className="app-header">NotesApp</h2>
				<NoteEditor />
				<NotesGrid />
			</div>
		);
	}
};