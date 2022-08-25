import { Box, Button, CircularProgress, Grid, Link, Modal, TextField, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, Fragment } from "react";
import style from "./style";
import sendForgottenPasswordEmail from "./BackendService";
import useEmailSentModal from "./EmailSentModal";

const FormState = {
	Default: 0,
	Loading: 1,
	Sent: 2,
}

const ForgottenPasswordModal = (props) => {
	const theme = useTheme();

	const [email, setEmail] = useState('');

	const [state, setState] = useState(FormState.Default);

	const handleSubmit = (e) => {
		e.preventDefault();

		setState(FormState.Loading);

		sendForgottenPasswordEmail(email).then(() => {
			setState(FormState.Sent);
			props.handleClose();
			props.emailSentModal.show();
		}).catch((error) => {
			alert('Hiba történt: ' + error);
			setState(FormState.Default);
		});
	}

	return (
		<Fragment>
			<Modal
				open={props.open}
			>
				<Box
					component="form"
					sx={style}
					onSubmit={handleSubmit}
				>
					<CloseIcon onClick={props.handleClose} sx={{
						position: 'absolute',
						right: 0,
						pr: style.p,
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
								type="email"
								value={email}
								onChange={(e) => setEmail(e.currentTarget.value)}
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
							{state == FormState.Loading && <CircularProgress />}
						</Grid>
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
			<props.emailSentModal.Component />
		</Fragment>
	);
}

const useForgottenPasswordModal = () => {
	const [state, setState] = useState(false);

	const handleShow = () => setState(true);
	const handleHide = () => setState(false);

	const emailSentModal = useEmailSentModal();

	return {
		state,
		show: handleShow,
		hide: handleHide,
		Component: (props) => {
			return ForgottenPasswordModal({
				...props,
				open: state,
				handleClose: handleHide,
				emailSentModal,
			});
		}
	}
}

export { ForgottenPasswordModal };

export default useForgottenPasswordModal;
