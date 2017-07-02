import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import notes from './notes';

export default combineReducers({
	routing: routerReducer,
	notes
})