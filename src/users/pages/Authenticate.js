import React, { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../shared/components/formElements/Button';
import Input from '../../shared/components/formElements/Input';
import Card from '../../shared/components/UIElements/Card';
import AuthContext from '../../shared/context/auth-context';
import useFormState from '../../shared/hooks/form-hook';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import './Authenticate.css';

function Authenticate(props) {
	const history = useHistory();
	const { login: authLogin } = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [formState, formValidityHandler, setFormData] = useFormState(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	// const logInHandler = (event) => {
	// 	event.preventDefault();
	// };

	const switchModeHandler = () => {
		// Before switching
		if (!isLoginMode) {
			// Set data to login mode because we are going to switch immediately
			setFormData(
				{ ...formState.inputs, name: undefined },
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			);
		} else {
			// Set data to signup mode because we are going to switch immediately
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevState) => !prevState);
	};

	const authSubmitHandler = (event) => {
		event.preventDefault();
		if (isLoginMode) {
			// verify the credentials and log the user in
			authLogin();
		} else {
			// Create an account for the user and log the user in
			// <-- There is still signing up to do -->
			authLogin();
		}
		// Redirect the user to the home page
		history.push('/');
		// console.log(
		// 	isLoginMode ? 'login credentials...' : 'signup credentials'
		// );
		// console.log(formState.inputs);
	};

	return (
		<Fragment>
			<Card className="authentication">
				<h2>{isLoginMode ? 'Login required' : 'Sign Up'}</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							id="name"
							label="Name"
							type="text"
							placeholder="Your Name"
							onInput={formValidityHandler}
							validators={[VALIDATOR_REQUIRE()]}
						/>
					)}
					<Input
						id="email"
						label="Email"
						type="email"
						placeholder="name@example.com"
						onInput={formValidityHandler}
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						placeholder="Password"
						onInput={formValidityHandler}
						validators={[
							VALIDATOR_REQUIRE(),
							VALIDATOR_MINLENGTH(5),
						]}
					/>

					<Button
						type="submit"
						disabled={!formState.isFormValid}
						// onClick={logInHandler}
					>
						{isLoginMode ? 'LogIn' : 'SignUp'}
					</Button>
				</form>

				<div className="switch-login-signup">
					{isLoginMode ? (
						<p>Don't have an Account?</p>
					) : (
						<p>Already have an Account?</p>
					)}

					<Button inverse onClick={switchModeHandler}>
						{'Switch to '}
						{isLoginMode ? 'Sign Up' : 'Log In'}
					</Button>
				</div>
			</Card>
		</Fragment>
	);
}

export default Authenticate;
