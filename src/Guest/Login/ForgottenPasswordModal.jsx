import { Box, Button, Grid, Link, Modal, TextField, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const padding = 3;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: padding,
	textAlign: 'center',
};

const ForgottenPasswordModal = (props) => {
	const theme = useTheme();

	return (
		<Modal
			open={props.open}
		>
			<Box component="form" sx={style}>
				<CloseIcon onClick={props.handleClose} sx={{
					position: 'absolute',
					right: 0,
					pr: padding,
					cursor: 'pointer',
				}} />
				<div style={{
					'text-transform': 'uppercase',
					'margin-bottom': '1em',
				}}>Elfelejtettem a jelszavam</div>
				<div style={{
					'color': theme.palette.primary.main,
					'font-size': '1.1rem',
					'font-weight': 'bold',
					'margin-bottom': '1em',
				}}>Kérem, adja meg e-mail címét!</div>
				<small>Figyelem! Active Directory-s felhasználói fiók használata esetén nincs lehetőség jelszó módosítására a rendszeren belül!</small>
				<Grid container sx={{
					justifyContent: 'center',
					gap: '0.5em',
					alignItems: 'center',
				}}>
					<Grid item>E-mail-cím:</Grid>
					<Grid item>
						<TextField
							required
							id="username"
							name="username"
							margin="normal"
							placeholder="E-mail-cím"
							tpye="email"
							sx={{mt: 3, mb: 3}}
						/>
					</Grid>
				</Grid>
				<Grid container sx={{
					justifyContent: 'flex-end',
					gap: '1em',
					alignItems: 'center',
				}}>
					<Grid item>
						<Link onClick={props.handleClose}>
							Mégsem
						</Link>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
						>
							Új jelszó kérése
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
}

const useForgottenPasswordModal = () => {
	const [state, setState] = useState(false);

	const handleShow = () => setState(true);
	const handleHide = () => setState(false);

	return {
		state,
		show: handleShow,
		hide: handleHide,
		Component: (props) => {
			return ForgottenPasswordModal({
				...props,
				open: state,
				handleClose: handleHide,
			});
		}
	}
}

export { ForgottenPasswordModal };

export default useForgottenPasswordModal;
