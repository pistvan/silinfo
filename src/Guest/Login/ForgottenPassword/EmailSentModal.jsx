import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import style from "./style";

const EmailSentModal = (props) => {
	return (
		<Modal
			open={props.open}
		>
			<Box component="form" sx={style}>
				<CloseIcon onClick={props.handleClose} sx={{
					position: 'absolute',
					right: 0,
					pr: style.p,
					cursor: 'pointer',
				}} />
				<Typography
					mb={2}
					sx={{
						textTransform: 'uppercase',
					}}
				>
					Elfelejtettem a jelszavam
				</Typography>
				<Typography>
					Sikeres mentés!
					Amennyiben helyes e-mail-címet adott meg,
					kérjük ellenőrizze a postafiókját, ahová
					további információkat küldtünk!
				</Typography>
			</Box>
		</Modal>
	);
}

const useEmailSentModal = () => {
	const [state, setState] = useState(false);

	const handleShow = () => setState(true);
	const handleHide = () => setState(false);

	return {
		state,
		show: handleShow,
		hide: handleHide,
		Component: (props) => {
			return EmailSentModal({
				...props,
				open: state,
				handleClose: handleHide,
			});
		}
	}
}

export { EmailSentModal };

export default useEmailSentModal;
