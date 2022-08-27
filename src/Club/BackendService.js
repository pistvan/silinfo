const storage = {
	elements: [
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
	],
	
	init: function() {
		if (!window.localStorage.getItem('elements')) {
			this.save(this.elements);
		}
	},

	save: function(elements) {
		window.localStorage.setItem('elements', JSON.stringify(elements));
	},

	load: function() {
		return JSON.parse(window.localStorage.getItem('elements') || '{}');
	},

	push: function(item) {
		let elements = this.load();
		elements.push(item);
		this.save(elements);
	},

	update: function(index, newValue) {
		let elements = this.load();
		elements[index] = newValue;
		this.save(elements);
	}
}

storage.init();

const methods = {
	createOrUpdateElement: (data) => new Promise((resolve, reject) => {
		let callback;

		if (data.id) {
			// update
			let elementIndex = storage.load().findIndex((el) => el.id === data.id);
			if (elementIndex >= 0) {
				storage.update(elementIndex, data);
				callback = () => resolve();
			} else {
				callback = () => reject('A keresett elem nem található.');
			}
		} else {
			// create
			// generate random id
			data.id = Math.random().toString(36).substring(2);
			storage.push(data);
			callback = () => resolve();
		}

		setTimeout(callback, 500);
	}),

	getElement: (id) => new Promise((resolve, reject) => {
		const element = storage.load().find((el) => el.id === id);

		const callback = element
			? () => resolve(element)
			: () => reject('A keresett elem nem található.');

		setTimeout(callback, 500);
	}),

	getElements: (filter, paginate) => new Promise((resolve) => {
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
		let filteredElements = storage.load();
		filterCallbacks.forEach((callback) => {
			filteredElements = filteredElements.filter(callback);
		});

		const result = {
			// slice according to paginate
			items: filteredElements.slice(
				paginate.size * (paginate.page - 1),
				paginate.size * (paginate.page)
			),
			// total number of elements (required by paginate)
			total: filteredElements.length,
		}

		setTimeout(() => resolve(result), 500);
	}),
}

export default methods;