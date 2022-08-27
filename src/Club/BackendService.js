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
		let callback;

		if (data.id) {
			// update
			let elementIndex = elements.findIndex((el) => el.id === data.id);
			if (elementIndex >= 0) {
				elements[elementIndex] = data;
				callback = () => resolve();
			} else {
				callback = () => reject('A keresett elem nem található.');
			}
		} else {
			// create
			// generate random id
			data.id = Math.random().toString(36).substring(2);
			elements.push(data);
			callback = () => resolve();
		}

		setTimeout(callback, 500);
	}),

	getElement: (id) => new Promise((resolve, reject) => {
		const element = elements.find((el) => el.id === id);

		const callback = element
			? () => resolve(element)
			: () => reject('A keresett elem nem található.');

		setTimeout(callback, 500);
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