import React from 'react';
import Button from '../../shared/components/formElements/Button';

import Input from '../../shared/components/formElements/Input';
import useFormState from '../../shared/hooks/form-hook';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
} from '../../shared/util/validators';
import './PlaceForm.css';

function NewPlace() {
	const [formState, formValidityHandler] = useFormState(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
			address: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const placeSubmitHandler = (event) => {
		event.preventDefault();
		if (!formState.isFormValid) {
			console.log('Form is not valid yet!!');
		}
		console.log(formState); // Send this to the backend
	};

	return (
		<form onSubmit={placeSubmitHandler} className="place-form">
			<Input
				id="title"
				type="text"
				placeholder="Name of the Place"
				label="Title"
				validators={[
					VALIDATOR_REQUIRE(),
					VALIDATOR_MINLENGTH(3),
					VALIDATOR_MAXLENGTH(50),
				]}
				// errorText="Enter a valid Name"
				onInput={formValidityHandler}
			/>
			<Input
				id="description"
				type="textarea"
				placeholder="Description (100-1000 letters)"
				label="Description"
				validators={[
					VALIDATOR_REQUIRE(),
					VALIDATOR_MINLENGTH(100),
					VALIDATOR_MAXLENGTH(1000),
				]}
				onInput={formValidityHandler}
			/>
			<Input
				id="address"
				type="textarea"
				rows="3"
				placeholder="Enter the Address"
				label="Address"
				validators={[
					VALIDATOR_REQUIRE(),
					VALIDATOR_MINLENGTH(20),
					VALIDATOR_MAXLENGTH(200),
				]}
				onInput={formValidityHandler}
			/>
			<Button disabled={!formState.isFormValid} type="submit">
				Submit
			</Button>
		</form>
	);
}

export default NewPlace;
