import React from 'react';

import PlaceItem from './PlaceItem';
import './PlaceList.css';

function PlaceList(props) {
	const { places } = props;

	const placeItems = places.map((place) => (
		<PlaceItem key={place.id} {...place} />
	));
	return <ul className="place-list">{placeItems}</ul>;
}

export default PlaceList;
