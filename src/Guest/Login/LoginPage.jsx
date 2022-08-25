import { Box, Button, Container, createTheme, Link, TextField, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import useForgottenPasswordModal from "./ForgottenPasswordModal";

const LoginPage = () => {
	const theme = createTheme({
		palette: {
			primary: {
				main: green[500],
				contrastText: 'white',
			},
		}
	});

	const fpModal = useForgottenPasswordModal();

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
			<Box component="form" sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
				<div>Jelentkezz be a felhasználóneveddel és jelszavaddal!</div>
				<TextField
					required
					id="username"
					name="username"
					label="Felhasználónév"
					fullWidth
					margin="normal"
					autoFocus
				/>
				<TextField
					required
					id="password"
					name="password"
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
	</ThemeProvider>
	);
}

export default LoginPage;
