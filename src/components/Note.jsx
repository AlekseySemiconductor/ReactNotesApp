import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Tags from './Tags.jsx';
import './Note.less';

import { connect } from 'react-redux';

class Note extends React.Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		backgroundColor: PropTypes.string.isRequired,
		tagNames: PropTypes.array.isRequired,
		children: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		let text = props.children,
			textLen = text.length;
			
		const maxLength = 45;

		if (textLen > maxLength) {
			text = text.substr(0, maxLength) + '...';
		}

		this.state = {
			isLink: textLen > maxLength,
			text: text
		}
	}

	handleNoteDelete = () => {
		const noteId = this.props.id,
			notes = this.props.reducer.notes,
			newNotes = notes.allNotes.filter(note => note.id !== noteId),
			newActiveNotes = notes.activeNotes.filter(note => note.id !== noteId);

		this.props.onDeleteNote(newNotes, newActiveNotes);
	}

	render = () => {
		let text = null;
		if (this.state.isLink) {
			text = <Link className="note__text" to={`/main/${this.props.id}`}>{this.state.text}</Link>;
		} else {
			text = <p>{this.state.text}</p>;
		}
		return (
			<div className="note" style={{backgroundColor: this.props.backgroundColor}} id={this.props.id}>
				<span className="delete-note" onClick={this.handleNoteDelete}>X</span>
				<Tags tagNames={this.props.tagNames} />
				<div>{text}</div>
			</div>
		);
	}
};

export default connect(
	state => ({
		reducer: state
	}),
	dispatch => ({
		onDeleteNote: (newNotes, newActiveNotes) => {
			dispatch({
				type: 'DELETE_NOTE',
				newNotes,
				newActiveNotes
			})
		}
	})
)(Note);