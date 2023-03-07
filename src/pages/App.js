import React from 'react';
import mapboxgl from '!mapbox-gl'; 
import config from '../../config/config.json'

// set access token from config
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            lng: 11.56,
            lat: 48.135,
            zoom: 10,
        };
        this.mapContainer = React.createRef();
        }
    
        componentDidMount() {
            const { lng, lat, zoom } = this.state;
            const map = new mapboxgl.Map({
                container: this.mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });
        }

        render() {
            return (
            <div>
                <h1 className="text-3xl font-bold underline">
                    TUM GNFR C Munich Emission Inventory
                </h1>
                <div ref={this.mapContainer} className="map-container" />
            </div>
            );
        }

}