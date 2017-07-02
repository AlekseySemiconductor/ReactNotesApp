import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Note from './Note.jsx';
import './NotesGrid.less';

class NotesGrid extends React.Component {
	static propTypes = {
		reducer: PropTypes.shape({
			notes: PropTypes.shape({
				allNotes: PropTypes.arrayOf(
					PropTypes.shape().isRequired
				).isRequired,
				activeNotes: PropTypes.arrayOf(
					PropTypes.shape().isRequired
				).isRequired
			}).isRequired
		}).isRequired
	}

	state = {
		notes: this.props.reducer.notes.allNotes
	}

	componentWillReceiveProps = nextProps => {
		this.setState({
			notes: nextProps.reducer.notes.activeNotes
		});
	}

	render = () => {
		return (
			<div className="notes-grid">
				{
					this.state.notes.map(note => {
						return (
							<Note 
								key={note.id}
								id={note.id}
								backgroundColor={note.bgColor}
								tagNames={note.tagNames}
							>{note.text}</Note>
						);
					})
				}
			</div>
		);
	}
};

export default connect(
	state => ({
		reducer: state
	})
)(NotesGrid);