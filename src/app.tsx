import * as React from 'react';
import { render } from 'react-dom';
import AppLogin from './pages/login';
import AppMain from './pages/main';
import { AuthProvider, getAuthState } from './store/auth';

const AppBody = () => {
	const auth = getAuthState();
	return auth?.loggedIn ? <AppMain /> : <AppLogin />;
};

const App = () => {
	return (
		<AuthProvider>
			<AppBody />
		</AuthProvider>
	);
};

render(<App />, document.body);