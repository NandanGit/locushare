import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Button from '../formElements/Button';

import './NavLinks.css';

function NavLinks(props) {
	const { isLoggedIn, logout: authLogout } = useContext(AuthContext);
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/users" exact>
					Users
				</NavLink>
			</li>
			{isLoggedIn ? (
				<Fragment>
					<li>
						<NavLink to="/u1/places">My Places</NavLink>
					</li>
					<li>
						<NavLink to="/places/new">Add Place</NavLink>
					</li>
					<li>
						<button className="danger-btn" onClick={authLogout}>
							Logout
						</button>
					</li>
				</Fragment>
			) : (
				<li>
					<NavLink to="/auth">Login/Signup</NavLink>
				</li>
			)}
		</ul>
	);
}

export default NavLinks;
