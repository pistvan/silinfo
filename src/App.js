import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './Guest/Login/LoginPage';

const theme = createTheme({
	palette: {
		primary: {
			main: green[500],
			contrastText: 'white',
		},
	}
});

function App() {
	const [token, setToken] = useState();

	return <ThemeProvider theme={theme}>
		<div className="App">
			{(true || token)
				? <Dashboard />
				: <LoginPage setToken={setToken} />
			}
		</div>
	</ThemeProvider>
}

export default App;
