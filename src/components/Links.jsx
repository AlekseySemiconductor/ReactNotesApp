import React from 'react';
import { Link } from 'react-router';
import './Links.less';

export default class Links extends React.Component {
	render = () => {
		return (
			<nav className="nav">
				<Link className="nav__link" activeClassName="nav__link_active" to="/">Home</Link>
				<Link className="nav__link" activeClassName="nav__link_active" to="/about">About</Link>
				<Link className="nav__link" activeClassName="nav__link_active" to="/main">Main</Link>
			</nav>
		)
	}
};