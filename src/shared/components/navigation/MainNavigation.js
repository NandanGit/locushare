import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

function MainNavigation(props) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openDrawerHandler = () => {
		setIsDrawerOpen(true);
	};

	const closeDrawerHandler = () => {
		setIsDrawerOpen(false);
	};

	return (
		<Fragment>
			{isDrawerOpen && <Backdrop onClick={closeDrawerHandler} />}
			<SideDrawer onClick={closeDrawerHandler} show={isDrawerOpen}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>
			<MainHeader>
				{!isDrawerOpen && (
					<button
						onClick={openDrawerHandler}
						className="main-navigation__menu-btn"
					>
						<span />
						<span />
						<span />
					</button>
				)}
				<h1 className="main-navigation__title">
					<Link to="/">Locushare</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</Fragment>
	);
}

export default MainNavigation;
