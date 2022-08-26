import { Backdrop, Box, Button, CircularProgress, IconButton, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from "react";
import { Link, useLinkClickHandler } from "react-router-dom";

const paginateValues = [2, 5]

const TableComponent = ({items}) => {
	if (!items || items.length === 0) {
		return <Typography>
			Nincs találat. {JSON.stringify(items)}
		</Typography>
	}

	return <TableContainer>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Név</TableCell>
					<TableCell>Aktív</TableCell>
					<TableCell>Műveletek</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{items.map((item) => (
					<TableRow key={item.id}>
						<TableCell component="th">
							{item.name}
							</TableCell>
						<TableCell>
							<Switch
								checked={item.active}
							/>
						</TableCell>
						<TableCell>
							<Link to={`/clubs/edit/${item.id}`}>
								<IconButton variant="contained" color="primary">
									<EditIcon />
								</IconButton>
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
}

const List = (props) => {
	const [pageSize, setPageSize] = useState(paginateValues[0]);

	const handlePaginate = (size) => {
		console.log("Paginate by " + size);
		setPageSize(size);
	}

	const handleCreateButton = useLinkClickHandler("/clubs/create");

	if (props.state.loading) {
		return <Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
		>
			<CircularProgress color="primary" />
		</Backdrop>
	}

	return <Fragment>
		<Box sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		}}>
			<Box>
				<Typography>
					Tételek száma
				</Typography>
				<Select
					value={pageSize}
					onChange={(e) => handlePaginate(e.target.value)}
					sx={{
						minWidth: '6em',
					}}
				>
					{paginateValues.map((value, index) => (
						<MenuItem value={value} key={index}>{value}</MenuItem>
					))}
				</Select>
			</Box>
			<Box>
				<Button
					variant="contained"
					color="primary"
					onClick={handleCreateButton}
				>
					Új társaság létrehozása
				</Button>
			</Box>
		</Box>
		<TableComponent items={props.state.items} />
	</Fragment>
}

export default List;