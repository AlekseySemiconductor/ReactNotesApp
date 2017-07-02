import Notes from '../notes.json';

let state = {
	'allNotes': Notes,
	'activeNotes': Notes,
	'activeTags': []
};

export default function notes (data = state, action) {
	if (action.type === 'ADD_NOTE') {
		
		if (data.activeTags.length) {

			const isTagIncluded = data.activeTags.some(tagName => {
				return action.newNote.tagNames.includes(tagName);
			});

			if (isTagIncluded) {
				return state = data = {
					'allNotes': [action.newNote, ...data.allNotes],
					'activeNotes': [action.newNote, ...data.activeNotes],
					'activeTags': [...data.activeTags]
				};
			}

			return state = data = {
				'allNotes': [action.newNote, ...data.allNotes],
				'activeNotes': [...data.activeNotes],
				'activeTags': [...data.activeTags]
			};

		}

		return state = data = {
			'allNotes': [action.newNote, ...data.allNotes],
			'activeNotes': [action.newNote, ...data.activeNotes],
			'activeTags': [...data.activeTags]
		};

	} else if (action.type === 'DELETE_NOTE') {

		if (data.activeTags.length) {

			if (!action.newActiveNotes.length) {
				return state = data = {
					'allNotes': [...action.newNotes],
					'activeNotes': [...action.newNotes],
					'activeTags': []
				};
			}

			return state = data = {
				'allNotes': [...action.newNotes],
				'activeNotes': [...action.newActiveNotes],
				'activeTags': [...data.activeTags]
			};
		}

		return state = data = {
			'allNotes': [...action.newNotes],
			'activeNotes': [...action.newActiveNotes],
			'activeTags': [...data.activeTags]
		};

	} else if (action.type === 'FIND_NOTE') {
		
		const activeNotes = data.allNotes.filter(note => {
			return action.activeTags.some(tagName => {
				return note.tagNames.includes(tagName);
			})
		});

		if (activeNotes.length) {
			return state = data = {
				'allNotes': [...data.allNotes],
				'activeNotes': [...activeNotes],
				'activeTags': [...action.activeTags]
			};
		} else {
			return state = data = {
				'allNotes': [...data.allNotes],
				'activeNotes': [...data.allNotes],
				'activeTags': [...action.activeTags]
			};
		}

	}
	return data;
};