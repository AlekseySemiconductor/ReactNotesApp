import React from 'react';
import PropTypes from 'prop-types';
import './Tags.less';

import Tag from './Tag.jsx';

import { connect } from 'react-redux';

class Tags extends React.Component {
	static propTypes = {
		tagNames: PropTypes.array.isRequired
	}

	state = { 
		activeTags: this.props.reducer.notes.activeTags
	}

	render = () => {
		let allActiveTags = [];

		this.props.reducer.notes.activeTags.forEach(tagName => {
			allActiveTags = [...allActiveTags, tagName];
		});

		return (
			<div className="tagsWrap">
				{
					this.props.tagNames.map((tag, i) => {
						return (
							<Tag
								key={i}
								isActive={allActiveTags.some(activeTag => activeTag === tag)}
							>{tag}</Tag>
						)
					})
				}
			</div>
		)
	}
};

export default connect(
	state => ({
		reducer: state
	})
)(Tags);