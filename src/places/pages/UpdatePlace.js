import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '../../shared/components/formElements/Button';
import Input from '../../shared/components/formElements/Input';
import useFormState from '../../shared/hooks/form-hook';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import './PlaceForm.css';

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

function UpdatePlace(props) {
	const { placeID } = useParams();
	const [formState, formValidityHandler, setFormData] = useFormState(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
		},
		false
	);
	const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeID);

	const { title: placeTitle, description: placeDescription } = identifiedPlace
		? identifiedPlace
		: {};

	useEffect(() => {
		setFormData(
			{
				title: {
					value: placeTitle,
					isValid: true,
				},
				description: {
					value: placeDescription,
					isValid: true,
				},
			},
			true
		);
	}, [setFormData, placeTitle, placeDescription]);

	if (!identifiedPlace) {
		return (
			<div className="center">
				<h1>Could not find the place!</h1>
			</div>
		);
	}
	// console.log(placeTitle, placeDescription);
	const updatePlaceHandler = (event) => {
		event.preventDefault();
		// Send the updated data to the backend
	};

	return (
		<Fragment>
			<form onSubmit={updatePlaceHandler} className="place-form">
				<Input
					id="title"
					type="text"
					placeholder="New title"
					label="Title"
					validators={[
						VALIDATOR_REQUIRE(),
						VALIDATOR_MINLENGTH(3),
						VALIDATOR_MAXLENGTH(50),
					]}
					value={placeTitle}
					valid={true}
					// errorText="Enter a valid Name"
					// onInput={formValidityHandler}
					onInput={formValidityHandler}
				/>
				<Input
					id="description"
					type="textarea"
					placeholder="New description (100-1000)"
					label="Description"
					validators={[
						VALIDATOR_REQUIRE(),
						VALIDATOR_MINLENGTH(100),
						VALIDATOR_MAXLENGTH(1000),
					]}
					value={placeDescription}
					valid={true}
					// errorText="Enter a valid Name"
					// onInput={formValidityHandler}
					onInput={formValidityHandler}
				/>
				<Button type="submit" disabled={!formState.isFormValid}>
					Update Place
				</Button>
			</form>
		</Fragment>
	);
}

export default UpdatePlace;
