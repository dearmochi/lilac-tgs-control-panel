import * as React from 'react';
import { logIn } from '../middleware/auth';
import { getAuthDispatch } from '../store/auth';

const LoginForm = () => {
	const dispatch = getAuthDispatch();
	//
	const [username, setUserName] = React.useState('');
	const [password, setPassword] = React.useState('');
	return (
		<div>
			<b>Login</b><br />
			<input type="text" onChange={e => setUserName(e.target.value)} /><br />
			<input type="password" onChange={e => setPassword(e.target.value)} /><br />
			<button onClick={() => logIn(dispatch, username, password)}>Login</button>
		</div>
	);
};

//
export default LoginForm; 