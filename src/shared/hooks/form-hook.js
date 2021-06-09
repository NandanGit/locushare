import { useCallback, useReducer } from 'react';

function formReducer(state, action) {
	// console.log(action);
	if (action.type === 'UPDATE') {
		if (typeof action.payload.inputID !== 'string') {
			return state;
		}
		let formIsValid = true;
		for (const inputID in state.inputs) {
			if (!state.inputs[inputID]) continue;
			if (inputID === action.payload.inputID) {
				formIsValid = formIsValid && action.payload.inputIsValid;
			} else {
				formIsValid = formIsValid && state.inputs[inputID].isValid;
			}
		}
		return {
			...state,
			inputs: {
				...state.inputs,
				[action.payload.inputID]: {
					value: action.payload.inputValue,
					isValid: action.payload.inputIsValid,
				},
			},
			isFormValid: formIsValid,
		};
	} else if (action.type === 'SET_DATA') {
		return {
			inputs: action.payload.inputs,
			isFormValid: action.payload.formValidity,
		};
	}
	return state;
}

function useFormState(initialInputs, initialFormValidity) {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInputs,
		isFormValid: initialFormValidity, // Overall form validation
	});

	const formValidityHandler = useCallback(
		(inputID, inputValue, inputIsValid) => {
			// console.log(formState);
			dispatch({
				type: 'UPDATE',
				payload: {
					inputID: inputID,
					inputValue: inputValue,
					inputIsValid: inputIsValid,
				},
			});
		},
		[]
	);

	const setFormData = useCallback((inputs, formValidity) => {
		dispatch({ type: 'SET_DATA', payload: { inputs, formValidity } });
	}, []);

	return [formState, formValidityHandler, setFormData];
}

export default useFormState;
