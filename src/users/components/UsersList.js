import React, { Fragment } from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

function UsersList(props) {
	const items = props.items;
	if (items.length === 0) {
		return (
			<div className="center">
				<Card className="no-users">
					<h1>No users</h1>
				</Card>
			</div>
		);
	}
	const userItems = items.map((user) => <UserItem key={user.id} {...user} />);
	return (
		<Fragment>
			<ul className="users-list">{userItems}</ul>
		</Fragment>
	);
}

export default UsersList;
