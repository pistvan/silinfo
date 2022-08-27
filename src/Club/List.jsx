import { Backdrop, Box, Button, CircularProgress, IconButton, MenuItem, Pagination, Select, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from "react";
import { Link, useLinkClickHandler } from "react-router-dom";

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
	const handleCreateButton = useLinkClickHandler("/clubs/create");

	if (props.loading) {
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
					value={props.paginate.size}
					onChange={(e) => props.handlePaginate({ size: e.target.value, page: 1 })}
					sx={{
						minWidth: '6em',
					}}
				>
					{props.paginateValues.map((value, index) => (
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

		<TableComponent items={props.items} />

		<Stack mt={3}>
			<Pagination
				count={Math.max(1, Math.ceil(props.total / props.paginate.size))}
				page={props.paginate.page}
				onChange={(e, page) => props.handlePaginate({ ...props.paginate, page })}
				color="primary"
				sx={{
					mx: 'auto',
				}}
			/>
		</Stack>
	</Fragment>
}

export default List;