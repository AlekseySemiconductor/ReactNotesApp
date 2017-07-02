import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Tag extends React.Component {
	static propTypes = {
		isActive: PropTypes.bool.isRequired
	}

	state = {
		isActive: this.props.isActive
	}

	handleFilterTags = () => {
		let activeTags = this.props.reducer.notes.activeTags;

		if (this.state.isActive) {
			activeTags = activeTags.filter(tagName => tagName !== this.props.children);
		} else {
			activeTags = [...activeTags, this.props.children];
		}

		this.props.onFiltesNotes(activeTags);
	}

	componentWillReceiveProps = nextProps => {
		if (nextProps.isActive !== this.state.isActive) {
			this.setState({
				isActive: nextProps.isActive
			});
		}
	}

	render = () => {
		return (
			<div
				className={`tag${this.state.isActive ? " active" : ""}`}
				onClick={this.handleFilterTags}
			>{this.props.children}</div>
		)
	}
};

export default connect(
	state => ({
		reducer: state
	}),
	dispatch => ({
		onFiltesNotes: (activeTags) => {
			dispatch({
				type: 'FIND_NOTE',
				activeTags
			})
		}
	})
)(Tag);