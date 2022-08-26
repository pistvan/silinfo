import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AppDrawerFactory, { width as drawerWidth } from "./AppDrawerFactory";

const Layout = (props) => {
	const appDrawer = AppDrawerFactory(true);

	const theme = useTheme();

	const marginAnimationSettings = {
		entering: {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		},
		leaving: {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		},
	}

	return <Box sx={{ display: 'flex' }}>
		<AppBar
			position="fixed"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
		>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					onClick={appDrawer.toggle}
				>
					{appDrawer.open ? <MenuOpenIcon /> : <MenuIcon />}
				</IconButton>
				<Box
					sx={{
						flexGrow: 1,
					}}
				></Box>
				<Typography
					variant="h6"
					component="div"
				>
					Felhasználó
				</Typography>
			</Toolbar>
		</AppBar>
		{appDrawer.Component}
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				p: 2,
				marginLeft: appDrawer.open ? 0 : `-${drawerWidth}px`,
				transition: theme.transitions.create(
					'margin',
					appDrawer.open
						? marginAnimationSettings.entering
						: marginAnimationSettings.leaving
				),
			}}
		>
			<Toolbar />
			{props.children}
		</Box>
	</Box>
}

export default Layout;
