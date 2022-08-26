// emulate content
const elements = [
	{
		id: 'random1',
		name: 'Első elem',
		active: true,
	},
	{
		id: 'random2',
		name: 'Második elem',
		active: false,
	},
	{
		id: 'random3',
		name: 'Harmadik elem',
		active: true,
	},
	{
		id: 'random4',
		name: 'Negyedik elem',
		active: true,
	},
	{
		id: 'random5',
		name: 'Ötödik elem',
		active: false,
	},
	{
		id: 'random6',
		name: 'Hatodik elem',
		active: false,
	},
	{
		id: 'random7',
		name: 'Hetedik elem',
		active: true,
	},
];

const methods = {
	createOrUpdateElement: (data) => new Promise((resolve, reject) => {
		// TODO: save content
		setTimeout(resolve, 500);
	}),

	getElement: (id) => new Promise((resolve, reject) => {
		setTimeout(() => resolve({}), 500);
	}),

	getElements: (filter, paginate) => new Promise((resolve, reject) => {
		let filterCallbacks = [];

		if (filter.name) {
			// case-insensitive includes
			filterCallbacks.push((item) => item.name.toLowerCase().includes(filter.name.toLowerCase()));
		}

		if (typeof filter.active == 'boolean') {
			// has the same active attribute
			filterCallbacks.push((item) => item.active === filter.active);
		}

		// filter through all callbacks
		let filteredElements = elements;
		filterCallbacks.forEach((callback) => {
			filteredElements = filteredElements.filter(callback);
		});

		setTimeout(() => resolve(filteredElements), 500);
	}),
}

export default methods;