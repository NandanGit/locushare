import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/formElements/Button';
import Card from '../../shared/components/UIElements/Card';

import PlaceList from '../components/PlaceList';

let DUMMY_PLACES = [];
DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Eiffel Tower',
		description:
			'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower',
		address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
		image: 'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzNTM2MTQ4MTkx/hith-eiffel-tower-istock_000016468972large-2.jpg',
		location: {
			lat: '48.8584° N',
			lng: '2.2945° E',
		},
		sharedBy: 'u1',
	},
	{
		id: 'p2',
		title: 'Taj Mahal',
		description:
			'The Taj Mahal, originally the Rauza-i-munawwara is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra',
		address:
			'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
		image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/1200px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
		location: {
			lat: '27.1751° N',
			lng: '78.0421° E',
		},
		sharedBy: 'u2',
	},
	{
		id: 'p3',
		title: 'Leaning Tower of Pisa',
		description:
			'The Leaning Tower of Pisa or simply the Tower of Pisa is the campanile, or freestanding bell tower, of the cathedral of the Italian city of Pisa, known worldwide for its nearly four-degree lean, the result of an unstable foundation.',
		address: 'Piazza del Duomo, 56126 Pisa PI, Italy',
		image: 'https://www.towerofpisa.org/wp-content/uploads/2015/04/pisa-leaning-tower1.jpg',
		location: {
			lat: '43.7230° N',
			lng: '10.3966° E',
		},

		sharedBy: 'u1',
	},
];

function UserPlaces(props) {
	const { userID } = useParams();
	const filteredPlaces = DUMMY_PLACES.filter(
		(place) => place.sharedBy === userID
	);
	if (!filteredPlaces.length) {
		return (
			<div className="place-list center">
				<Card>
					<h1>No places found</h1>
					<Button to="/places/new">Create One</Button>
				</Card>
			</div>
		);
	}
	return <PlaceList places={filteredPlaces} />;
}

export default UserPlaces;
