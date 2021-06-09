import { createContext } from 'react';

const initialContextData = {
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
};

const AuthContext = createContext(initialContextData);

export default AuthContext;
