import React from 'react';
import Button from '../formElements/Button';

import Card from './Card';

function AuthenticationWarning(props) {
	return (
		<div className="center container">
			<Card>
				<h1>{props.warningMessage}</h1>
				<Button className="mb-3" to="/auth">
					LogIn
				</Button>
				<Button className="mb-3" inverse to="/">
					Go to Home Page
				</Button>
			</Card>
		</div>
	);
}

export default AuthenticationWarning;
