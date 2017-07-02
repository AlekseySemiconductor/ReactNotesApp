import React from 'react';
import { connect } from 'react-redux';
import Links from './Links.jsx';
import './NoteView.less';

class NoteView extends React.Component {
	constructor(props) {
		super(props);

		let text,
			tags,
			backgroundColor;

		props.reducer.notes.allNotes.forEach(note => {
			if (note.id === this.props.ownProps.params.id*1) {
				text = note.text;
				tags = note.tagNames;
				backgroundColor = note.bgColor;
			}
		});

		this.state = {
			text: text,
			tags: tags,
			backgroundColor: backgroundColor
		}
	}

	render = () => {
		return (
			<div className="notes-app">
				<Links />
				<div className="about">
					{
						this.state.tags.map((tag, i) => {
							return (
								<div className="tag" key={i}>{tag}</div>
							)
						})
					}
					<p
						className="viewText"
						style={{backgroundColor: this.state.backgroundColor}}
					>{this.state.text}</p>
				</div>
			</div>
		);
	}
};

export default connect(
	(state, ownProps) => ({
		reducer: state,
		ownProps
	})
)(NoteView);