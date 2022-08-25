const sendLoginRequest = (auth) => new Promise((resolve, reject) => {
	let callback;

	if (auth.username === 'admin' && auth.password === 'admin') {
		callback = () => resolve({
			token: 'some-id',
		})
	} else {
		callback = () => reject('Hibás adatok. Próbáld ezzel: admin / admin');
	}

	// Emulate AJAX call.
	setTimeout(callback, 500);
});

export default sendLoginRequest;
