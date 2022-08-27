import { Backdrop, Box, Breadcrumbs, Button, CircularProgress, Switch, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import Backend from "./BackendService";

const Edit = () => {
	const {id} = useParams();

	const [state, setState] = useState({
		form: Boolean(id) ? null : {
			id: null,
			name: '',
			active: true,
		},
		loading: Boolean(id),
	});

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		setState((state) => ({
			...state,
			loading: true,
		}));

		Backend.createOrUpdateElement(state.form).then(() => {
			navigate('/clubs');
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		});
	}

	const handleInitialize = () => {
		setState((state) => ({
			...state,
			loading: true,
		}));

		Backend.getElement(id).then((element) => {
			setState((state) => ({
				...state,
				form: element,
				loading: false,
			}));
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		});
	}

	useEffect(() => {
		if (id) {
			handleInitialize();
		}
	}, []);

	const handleInputChange = (e) => {
		const overwrite = (form) => ({
			[e.target.name]: (e.target.type === 'checkbox')
				? !(form[e.target.name])
				: e.target.value,
		});

		setState((state) => ({
			...state,
			form: {
				...state.form,
				...overwrite(state.form),
			}
		}));
	}

	if (state.loading) {
		return <Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
		>
			<CircularProgress color="primary" />
		</Backdrop>
	}

	return <Fragment>
		<Breadcrumbs>
			<Link to="/">
				Társaságok
			</Link>
			<Link to="/clubs">
				Társaság
			</Link>
			<Link to="#">
				{id ? "Szerkesztés" : "Létrehozás"}
			</Link>
		</Breadcrumbs>

		<Typography component="h1" variant="h5">
			{id ? "Társaság szerkesztése" : "Társaság létrehozása"}
		</Typography>

		<Box
			component="form"
			onSubmit={handleSubmit}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'baseline',
				}}
			>
				<Typography
					component="label"
					htmlFor="form_name"
					sx={{
						width: '7em',
					}}
				>
					Név
				</Typography>
				<TextField
					required
					id="form_name"
					name="name"
					value={state.form?.name}
					onChange={handleInputChange}
					fullWidth
					margin="normal"
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'baseline',
				}}
			>
				<Typography
					component="label"
					sx={{
						width: '7em',
					}}
				>
					Aktív
				</Typography>
				<Switch
					name="active"
					checked={state.form?.active}
					onChange={handleInputChange}
				/>
			</Box>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				sx={{
					mt: 2,
				}}
			>
				Mentés
			</Button>
		</Box>
	</Fragment>
}

export default Edit;
