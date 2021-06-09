import React from 'react';

import './Map.css';

function Map(props) {
	const { lat: latitude, lng: longitude, place } = props.coordinates;
	let query;
	if(!place){
		query = `${latitude}, ${longitude}`;
	}else{
		query = `${place}`;
	}
	const mapSource = `https://maps.google.com/maps?width=600&height=400&hl=en&q=${query}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;

	return (
		<div className={`map ${props.className}`} style={props.style}>
			<div className="mapouter">
				<div className="gmap_canvas">
					<iframe
						title="map"
						className="gmap_iframe"
						width="100%"
						frameBorder="0"
						scrolling="no"
						marginHeight="0"
						marginWidth="0"
						src={mapSource}
					></iframe>
					<a href="https://www.bgmi.org/">BGMI</a>
				</div>
			</div>
		</div>
	);
}

export default Map;
