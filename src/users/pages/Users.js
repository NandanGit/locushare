import React, { Fragment } from 'react';
import UsersList from '../components/UsersList';

const DUMMY_USERS = [
	{
		id: 'u1',
		name: 'John',
		image: 'https://images.unsplash.com/photo-1622209031219-e52006b86cf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500',
		placeCount: 3,
	},
	{
		id: 'u2',
		name: 'Joe',
		image: 'https://images.unsplash.com/photo-1622209031219-e52006b86cf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500',
		placeCount: 0,
	},
	{
		id: 'u3',
		name: 'Bob',
		image: 'https://images.unsplash.com/photo-1622209031219-e52006b86cf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500',
		placeCount: 2,
	},
	{
		id: 'u4',
		name: 'sam',
		image: 'https://images.unsplash.com/photo-1622209031219-e52006b86cf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500',
		placeCount: 1,
	},
];

function Users() {
	return (
		<Fragment>
			<UsersList items={DUMMY_USERS} />
		</Fragment>
	);
}

export default Users;
