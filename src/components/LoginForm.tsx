import * as React from 'react';
import { logIn } from '../middleware/auth';
import { getAuthDispatch } from '../store/auth';

const LoginForm = () => {
	const dispatch = getAuthDispatch();
	//
	const [username, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');

	const formSubmit = (e: React.FormEvent) => {
		logIn(dispatch, username, password);
		e.preventDefault();
	};

	return (
		<form onSubmit={formSubmit}>
			<b>Login</b><br />
			<input type="text" onChange={e => setUserName(e.target.value)} /><br />
			<input type="password" onChange={e => setPassword(e.target.value)} /><br />
			<input type="submit" />
		</form>
	);
};

//
export default LoginForm; 