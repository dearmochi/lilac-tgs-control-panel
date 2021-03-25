import * as React from 'react';
import { render } from 'react-dom';
import { logIn } from './middleware/auth';
import { AuthProvider, getAuthDispatch, getAuthState } from './store/auth';

const LogIn = () => {
	const auth = getAuthState();
	const dispatch = getAuthDispatch();
	//
	const [username, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');
	return (
		<div>
			Logged in: {auth?.loggedIn ? 'Yes' : 'No'}<br />
			Username: {auth?.user.name}<br />
			<b>Login</b><br />
			<input type="text" onChange={e => setUserName(e.target.value)} /><br />
			<input type="password" onChange={e => setPassword(e.target.value)} /><br />
			<button onClick={() => logIn(dispatch, username, password)}>Click me</button>
		</div>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<LogIn />
		</AuthProvider>
	);
};

render(<App />, document.body);