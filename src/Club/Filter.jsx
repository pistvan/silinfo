import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

const defaultValues = {
	name: '',
	active: '',
}

const Filter = (props) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		props.handler(formState);
	}

	const [formState, setFormState] = useState(defaultValues);

	const handleInputChange = (e) => {
		setFormState((state) => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	}

	const handleReset = (e) => {
		e.preventDefault();

		setFormState(defaultValues);

		props.handler(defaultValues);
	}

	return <Box
		component="form"
		onSubmit={handleSubmit}
		onReset={handleReset}
		sx={{
			mt: 2,
			mb: 4,
			ml: 4,
		}}
	>
		<Typography>Szűrő</Typography>
		<Box sx={{
			display: 'flex',
			mb: 1,
		}}>
			<Box width="50%">
				<InputLabel id="label">Társaság neve</InputLabel>
				<TextField
					name="name"
					value={formState.name}
					onChange={handleInputChange}
				></TextField>
			</Box>
			<Box width="50%">
				<InputLabel id="label">Aktív</InputLabel>
				<Select
					name="active"
					value={formState.active}
					onChange={handleInputChange}
					sx={{
						minWidth: '8em',
					}}
				>
					<MenuItem value={true}>Igen</MenuItem>
					<MenuItem value={false}>Nem</MenuItem>
				</Select>
			</Box>
		</Box>
		<Grid container sx={{
			gap: '0.5em',
		}}>
			<Button
				type="submit"
				variant="contained"
				color="primary"
			>
				Szűrés
			</Button>
			<Button
				type="reset"
				variant="outlined"
				color="primary"
			>
				Alapértelmezett
			</Button>
		</Grid>
	</Box>
}

export default Filter;
