import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './Guest/Login/LoginPage';

const theme = createTheme({
	palette: {
		background: {
			default: '#f9f9f9',
		},
		primary: {
			main: '#5db47c',
			contrastText: 'white',
		},
		warn: {
			main: '#e57681',
		},
	}
});

function App() {
	const [token, setToken] = useState();

	return <ThemeProvider theme={theme}>
		<div className="App">
			{token
				? <Dashboard />
				: <LoginPage setToken={setToken} />
			}
		</div>
	</ThemeProvider>
}

export default App;
