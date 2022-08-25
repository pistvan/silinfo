import { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './Guest/Login/LoginPage';

function App() {
	const [token, setToken] = useState();

	if (!token) {
		return <div className="App">
			<LoginPage setToken={setToken} />
		</div>
	}

	return <div className="App">
		<Dashboard />
	</div>
}

export default App;
