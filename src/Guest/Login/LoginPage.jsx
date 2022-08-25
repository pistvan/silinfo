import { Backdrop, Box, Button, CircularProgress, Container, createTheme, Link, TextField, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import sendLoginRequest from "./BackendService"
import useForgottenPasswordModal from "./ForgottenPassword/ForgottenPasswordModal";

const LoginPage = ({ setToken }) => {
	const theme = createTheme({
		palette: {
			primary: {
				main: green[500],
				contrastText: 'white',
			},
		}
	});

	const fpModal = useForgottenPasswordModal();

	const [formState, setFormState] = useState({
		username: '',
		password: '',
	});

	const handleInputChange = (e) => {
		setFormState((state) => ({
			...state,
			[e.currentTarget.name]: e.currentTarget.value,
		}));
	}

	const [isLoading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		sendLoginRequest(formState).then((data) => {
			setToken(data.token);
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		}).finally(() => {
			setLoading(false);
		});
	}

	return (
	<ThemeProvider theme={theme}>
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
				<div>Jelentkezz be a felhasználóneveddel és jelszavaddal!</div>
				<TextField
					required
					id="username"
					name="username"
					value={formState.username}
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
					value={formState.password}
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
			open={isLoading}
		>
			<CircularProgress />
		</Backdrop>
	</ThemeProvider>
	);
}

export default LoginPage;
