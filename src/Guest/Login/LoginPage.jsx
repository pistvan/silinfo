import { Backdrop, Box, Button, CircularProgress, Container, Link, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Fragment, useState } from "react";
import sendLoginRequest from "./BackendService"
import useForgottenPasswordModal from "./ForgottenPassword/ForgottenPasswordModal";

const LoginPage = ({ setToken }) => {
	const [state, setState] = useState({
		form: {
			username: '',
			password: '',
		},
		loading: false,
	});

	const fpModal = useForgottenPasswordModal();

	const handleInputChange = (e) => {
		setState((state) => ({
			...state,
			form: {
				...state.form,
				[e.target.name]: e.target.value,
			},
		}));
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setState((state) => ({
			...state,
			loading: true,
		}));

		sendLoginRequest(state.form).then((data) => {
			setToken(data.token);
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		}).finally(() => {
			setState((state) => ({
				...state,
				loading: false,
			}));
		});
	}

	return (
	<Fragment>
		<fpModal.Component />
		<Container maxWidth="sm" sx={{
			borderWidth: '1px',
			borderColor: green[800],
			borderStyle: 'solid',
			borderRadius: '1em',
			padding: 2,
			mt: 2,
		}}>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography>
					Jelentkezz be a felhasználóneveddel és jelszavaddal!
				</Typography>
				<TextField
					required
					id="username"
					name="username"
					value={state.form.username}
					onChange={handleInputChange}
					label="Felhasználónév"
					fullWidth
					margin="normal"
					autoFocus
				/>
				<TextField
					required
					id="password"
					name="password"
					value={state.form.password}
					onChange={handleInputChange}
					label="Jelszó"
					fullWidth
					margin="normal"
					type="password"
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{
						mt: 3,
						mb: 2,
						width: '50%',
					}}
				>
					Bejelentkezés
				</Button>
				<Link onClick={fpModal.show}>
					Elfelejtettem a jelszavam
				</Link>
			</Box>
		</Container>
		<Backdrop
			open={state.loading}
		>
			<CircularProgress />
		</Backdrop>
	</Fragment>
	);
}

export default LoginPage;
