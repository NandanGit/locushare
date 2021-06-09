import React, { useEffect, useReducer } from 'react';

import './Input.css';
import { validate } from '../../util/validators.js';

function inputReducer(state, action) {
	if (action.type === 'VALIDATE') {
		const [isValid, errorMessage] = validate(
			action.payload.value,
			action.payload.validators
		);
		// console.log(isValid, errorMessage);
		return {
			...state,
			value: action.payload.value,
			isValid: isValid,
			errorMessage: errorMessage,
		};
	} else if (action.type === 'TOUCH') {
		return {
			...state,
			isTouched: true,
		};
	} else if (action.type === 'CHANGE') {
		return {
			...state,
			value: action.payload.value,
		};
	}
	return state;
}

function Input(props) {
	const {
		label: inputLabel,
		className: inputClassName,
		type: inputType,
		id: inputID,
		errorText: inputErrorText,
		validators: inputValidators,
		value: prevInputValue,
		valid: isInputValid,
	} = props;

	// Using Reducer
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: prevInputValue || '',
		isValid: isInputValid || false,
		errorMessage: undefined,
		isTouched: false,
	});

	const { onInput } = props;
	const { value: inputValue, isValid: inputIsValid } = inputState;
	useEffect(() => {
		onInput(inputID, inputValue, inputIsValid);
	}, [onInput, inputID, inputValue, inputIsValid]);

	const inputChangeHandler = (event) => {
		dispatch({
			type: 'VALIDATE',
			payload: {
				value: event.target.value.trimStart(),
				validators: inputValidators,
			},
		});
		// if (inputState.isTouched) {
		// 	dispatch({
		// 		type: 'VALIDATE',
		// 		payload: {
		// 			value: event.target.value.trimStart(),
		// 			validators: inputValidators,
		// 		},
		// 	});
		// } else {
		// 	dispatch({
		// 		type: 'CHANGE',
		// 		payload: {
		// 			value: event.target.value.trimStart(),
		// 		},
		// 	});
		// }
	};

	// const textareaChangeHandler = (event) => {
	// 	if (inputState.isTouched) {
	// 		dispatch({
	// 			type: 'VALIDATE',
	// 			payload: {
	// 				value: event.target.value,
	// 				validators: inputValidators,
	// 			},
	// 		});
	// 	} else {
	// 		dispatch({
	// 			type: 'CHANGE',
	// 			payload: {
	// 				value: event.target.value,
	// 			},
	// 		});
	// 	}
	// };

	const inputBlurHandler = (event) => {
		dispatch({ type: 'TOUCH' });
		dispatch({
			type: 'VALIDATE',
			payload: {
				value: event.target.value.trim(),
				validators: inputValidators,
			},
		});
	};

	let inputElement;
	if (inputType === 'textarea') {
		const inputRows = props.rows;
		inputElement = (
			<textarea
				{...props}
				valid={String(props.valid)}
				id={inputID || Math.random()}
				rows={inputRows || 5}
				onChange={inputChangeHandler}
				value={inputState.value} // Two way binding
				onBlur={inputBlurHandler}
			/>
		);
	} else {
		inputElement = (
			<input
				{...props}
				valid={String(props.valid)}
				id={inputID || Math.random()}
				onChange={inputChangeHandler}
				value={inputState.value} // Two way binding
				onBlur={inputBlurHandler}
			/>
		);
	}

	return (
		<div
			className={`form-control ${
				!inputState.isValid &&
				inputState.isTouched &&
				'form-control--invalid'
			} ${inputClassName}`}
		>
			<label>{inputLabel || ''}</label>
			{inputElement}
			{!inputState.isValid && inputState.isTouched && (
				<p>{inputErrorText || inputState.errorMessage}</p>
			)}
		</div>
	);
}

export default Input;
