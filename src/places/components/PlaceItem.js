import React, { Fragment, useContext, useState } from 'react';
import Button from '../../shared/components/formElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import AuthContext from '../../shared/context/auth-context';

import './PlaceItem.css';

function PlaceItem(props) {
	const { isLoggedIn } = useContext(AuthContext);
	const [isMapOpen, setIsMapOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const openMapHandler = () => {
		setIsMapOpen(true);
	};
	const closeMapHandler = () => {
		setIsMapOpen(false);
	};

	const openDeleteWarningHandler = () => {
		setIsConfirmModalOpen(true);
	};
	const closeDeleteWarningHandler = () => {
		setIsConfirmModalOpen(false);
	};

	const confirmDeleteHandler = () => {
		console.log('Deleting...');
		closeDeleteWarningHandler(); // Close the Modal
	};

	const {
		image: placeImage,
		title: placeTitle,
		address: placeAddress,
		description: placeDescription,
		id: placeID,
		location: placeLocation,
	} = props;

	return (
		<Fragment>
			<Modal
				show={isMapOpen}
				onClose={closeMapHandler}
				header={placeAddress}
				contentClass="place-item__modal-content"
				// footerClass="place-item__modal_actions"
				// footer={<Button onClick={closeMapHandler}>Close</Button>}
			>
				<div className="map-container">
					<Map coordinates={placeLocation} />
				</div>
			</Modal>
			<Modal
				show={isConfirmModalOpen}
				onClose={closeDeleteWarningHandler}
				header={'Are you sure?'}
				footerClass="place-item__modal-actions"
				footer={
					<Fragment>
						<Button inverse onClick={closeDeleteWarningHandler}>
							Cancel
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							Delete
						</Button>
					</Fragment>
				}
			>
				<h2>Do you want to proceed?</h2>
				<h3>Note that this cant be undone!</h3>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={placeImage} alt={placeTitle} />
					</div>
					<div className="place-item__info">
						<h2>{placeTitle}</h2>
						<h3>{placeAddress}</h3>
						<p>{placeDescription}</p>
					</div>
					<div
						className={`place-item__actions ${
							!isLoggedIn && 'not-logged-in'
						}`}
					>
						<Button inverse onClick={openMapHandler}>
							View on map
						</Button>
						{isLoggedIn && (
							<div className="place-item__actions-restricted">
								<Button to={`/places/${placeID}`}>Edit</Button>
								<Button
									danger
									onClick={openDeleteWarningHandler}
								>
									Delete
								</Button>
							</div>
						)}
					</div>
				</Card>
			</li>
		</Fragment>
	);
}

export default PlaceItem;
