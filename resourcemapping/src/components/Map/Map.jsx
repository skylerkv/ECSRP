import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import './styles.css';
const Map = () => {
    //const isMobile = useMediaQuery('(min-width: 600px'); //if device is less that 600px
    //^^find sub function for above
    const coordinates = {lat: 44.8113, lng: -91.4985}; // (-) for west
    return (
        <div className='mapContainer'>
            <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyBm1YCZp02ziRE_v7HXVxa2CHxjvKYLNI8'}} //tbd
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={''}
                onChildClick={''}
            >
            </GoogleMapReact>
        </div>
    );
}
export default Map;