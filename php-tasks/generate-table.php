<?php

$rows = $_GET['rows'] ?? null;
$columns = $_GET['columns'] ?? null;

if (is_null($rows) || is_null($columns)) {
	http_response_code(500);
	throw new InvalidArgumentException('Nem megfelelő paraméterek.');
}
?>
<table class="table table-bordered">
	<tbody>
<?php for ($i = 0; $i < $rows; ++$i): ?>
		<tr>
<?php for ($j = 0; $j < $columns; ++$j): ?>
			<td>&nbsp;</td>
<?php endfor; ?>
		</tr>
<?php endfor; ?>
	</tbody>
</table>