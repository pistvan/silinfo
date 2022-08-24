/**
 * Generál egy jQuery objektumot, benne a kívánt méretű táblázattal.
 * @param {number} rows Sorok száma.
 * @param {number} columns Oszlopok száma
 * @returns {object}
 */
 const generateTable = (rows, columns) => {
	let $tbody = $('<tbody>');

	// Soronként ...
	for (let i = 0; i < rows; ++i) {
		let $row = $('<tr>');

		// ... majd oszloponként
		for (let j = 0; j < columns; ++j) {
			let $cell = $('<td>').html('&nbsp;');

			$row.append($cell);
		}

		$tbody.append($row);
	}

	const $table = $('<table>').addClass('table table-bordered').append($tbody);
	return $table;
}

/**
 * Generál egy véletlen CSS-színt.
 * @returns {string}
 */
const generateRandomCssColor = () => {
	const color = Math.floor(Math.random() * 256 * 256 * 256).toString(16);
	return '#' + color;
}

/**
 * Generál egy gombot, amire rányomva a paraméterben megadott táblázatot kiszínezi.
 * @param {object} $table jQuery táblázat
 * @returns {object} jQuery gomb
 */
const generateColorizeButton = ($table) => {
	let $button = $('<button>').addClass('btn btn-primary').text('Színezz át!');

	$button.click(() => {
		$table.find('tbody tr td').css('background-color', generateRandomCssColor);
	});

	return $button;
}

/**
 * Táblázatot generál jQuery-vel, Promise-t ad vissza.
 * @param {number} rows Sorok száma
 * @param {number} columns Oszlopok száma
 * @returns Promise
 */
const generateTableWithJsStrategyAsync = (rows, columns) => new Promise((resolve) => {
	$table = generateTable(rows, columns);
	resolve($table);
});

/**
 * Táblázatot generál PHP-val (AJAX), Promise-t ad vissza.
 * @param {number} rows Sorok száma
 * @param {number} columns Oszlopok száma
 * @returns Promise
 */
 const generateTableWithPhpStrategyAsync = (rows, columns) => new Promise((resolve, reject) => {
	$.ajax({
		url: '../php-tasks/generate-table.php',
		data: {
			rows,
			columns,
		},
		dataType: 'html',
	}).done((data) => {
		$table = $(data);
		resolve($table);
	}).fail((data, textStatus, errorThrown) => {
		reject(errorThrown);
	});
});

$(function() {
	let $saveButton = $('#saveButton');
	let $target = $('#generated');

	$saveButton.click(() => {
		const rows = $('#rows').val();
		const columns = $('#columns').val();

		const strategy = $('input[name=strategy]:checked').val() || '';
		let strategyFunction;

		switch (strategy) {
			case 'php':
				strategyFunction = generateTableWithPhpStrategyAsync;
				break;
			case 'js':
				strategyFunction = generateTableWithJsStrategyAsync;
				break;
			default:
				alert('A rádiógomb nincs kiválasztva.');
				return false;
		}

		strategyFunction(rows, columns).then(($table) => {
			let $button = generateColorizeButton($table);
			$target.html('').append($table).append($button);
		}, (error) => {
			$target.html('');
			alert('Hiba történt: ' + error);
		});
	});
});