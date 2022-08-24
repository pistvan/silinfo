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

$(function() {
	let $saveButton = $('#saveButton');
	let $target = $('#generated');

	$saveButton.click(() => {
		const rows = $('#rows').val();
		const columns = $('#columns').val();

		const $table = generateTable(rows, columns);
		const $button = generateColorizeButton($table);

		$target.html('').append($table).append($button);
	});
});