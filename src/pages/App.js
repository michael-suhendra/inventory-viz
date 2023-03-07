import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// D:\projects\inventory-viz\src\pages\App.js6:22  error  React Hook "useRef" cannot be called at the top level. ReactHooks must be called in a React function component or a custom React Hook function     react-hooks/rules-of-hooks

// already changed
mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbC1zdWhlbmRyYSIsImEiOiJjbGJrdjQ1enAwMWc3NDBteHpocDMwd3ZwIn0.XyPPSemW0MtJl37qs_Xnqg';

export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            lng: 11.582,
            lat: 48.135,
            zoom: 10
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