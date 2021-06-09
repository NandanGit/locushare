import React, { Fragment, useCallback, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/navigation/MainNavigation';
import AuthenticationWarning from './shared/components/UIElements/AuthenticationWarning';
import AuthContext from './shared/context/auth-context';
import Authenticate from './users/pages/Authenticate';
import Users from './users/pages/Users';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	let routes;
	if (isLoggedIn) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Redirect to="/users" />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Route path="/:userID/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/new" exact>
					<NewPlace />
				</Route>
				<Route path="/places/:placeID">
					<UpdatePlace />
				</Route>
				<Route path="/auth" exact>
					<Authenticate />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/ " exact>
					<Redirect to="/users" />
				</Route>
				<Route path="/users" exact>
					<Users />
				</Route>
				<Route path="/:userID/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/new" exact>
					<AuthenticationWarning warningMessage="You need to Login before you create a Place" />
				</Route>
				<Route path="/places/:placeID">
					<AuthenticationWarning warningMessage="You need to Login before you can edit a Place" />
				</Route>
				<Route path="/auth" exact>
					<Authenticate />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	const authProviderValue = { isLoggedIn, login, logout };
	return (
		<AuthContext.Provider value={authProviderValue}>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
