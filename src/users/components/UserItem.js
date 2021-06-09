import React from 'react';
import './UserItem.css';
import Avatar from '../../shared/components/UIElements/Avatar.js';
import Card from '../../shared/components/UIElements/Card.js';
import { Link } from 'react-router-dom';

function UserItem(props) {
	const {
		id: userID,
		name: userName,
		image: userImage,
		placeCount: userPlaceCount,
	} = props;
	return (
		<li className="user-item">
			<Card className="user-item__content">
				<Link to={`/${userID}/places`}>
					<div className="user-item__image">
						<Avatar image={userImage} alt={userName} />
					</div>
					<div className="user-item__info">
						<h2>{userName}</h2>
						<h3>
							{userPlaceCount} Place{userPlaceCount !== 1 && 's'}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
}

export default UserItem;
