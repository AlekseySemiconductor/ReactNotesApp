import React from 'react';
import PropTypes from 'prop-types';
import './NoteEditor.less';

import { connect } from 'react-redux';

class NoteEditor extends React.Component {
	state = {
		text: '',
		backgroundColor: '',
		tagNames: []
	}

	handleTextChange = event => {
		this.setState({text: event.target.value});
	}

	generateColor = () => {
		const x = Math.round(Math.random()*255),
			y = Math.round(Math.random()*255),
			z = Math.round(Math.random()*255),
			color = 'rgb('+x+','+y+','+z+')';

		this.refs.editor.style.backgroundColor = color;
		this.setState({backgroundColor: color});
	}

	handleTagAdd = () => {
		const tagName = this.refs.input.value;
		if (!tagName) return;

		this.refs.tagField.innerHTML += '<div class="tagBut">' + tagName.toLowerCase() + '</div>';

		this.refs.input.value = '';
		this.setState({
			tagNames: [...this.state.tagNames, tagName.toLowerCase()]
		});
	}

	handleNoteAdd = () => {
		// введите текст или укажите цвет заметки
		if (this.state.text == '' || this.state.backgroundColor == '') return;

		this.props.onAddNote({
			text: this.state.text,
			bgColor: this.state.backgroundColor,
			tagNames: this.state.tagNames,
			id: Date.now()
		});

		this.refs.editor.style.backgroundColor = '';
		this.refs.tagField.innerHTML = "";
		this.setState({
			text: '',
			backgroundColor: '',
			tagNames: []
		});
	}

	render = () => {
		return (
			<div className="note-editor" style={{backgroundColor: this.state.bgColor}} ref="editor">
				<textarea
					placeholder="Введите текст заметки:" 
					rows={5}
					className="textarea"
					value={this.state.text}
					onChange={this.handleTextChange}
				/>
				<input
					placeholder="Введите тег заметки:"
					className="input"
					ref="input"
				/>
				<div className="tagField" ref="tagField"></div>
				<button
					className="btn btn_black mr10"
					onClick={this.generateColor}
				>Генерировать случайный цвет</button>
				<button
					className="btn btn_green mr10"
					onClick={this.handleNoteAdd}
				>Добавить заметку</button>
				<button
					className="btn btn_blue"
					onClick={this.handleTagAdd}
				>Добавить тег</button>
			</div>
		);
	}
};

export default connect(
	state => ({
		reducer: state
	}),
	dispatch => ({
		onAddNote: newNote => {
			dispatch({
				type: 'ADD_NOTE',
				newNote: {
					"id": newNote.id,
					"bgColor": newNote.bgColor,
					"tagNames": newNote.tagNames,
					"text": newNote.text
				}
			})
		}
	})
)(NoteEditor);