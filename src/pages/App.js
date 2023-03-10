import React from 'react';
import mapboxgl from '!mapbox-gl'; 
//import 'mapbox-gl/dist/mapbox-gl.css';
import * as styles from '../styles/mapbox-gl-2.3.1.css';
import config from '../../config/config.json'

// set access token from config
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 11.56,
            lat: 48.135,
            zoom: 10,
            currentMap: null
        };
        this.mapContainer = React.createRef();
        }
    
        componentDidMount() {
            const { lng, lat, zoom, currentMap } = this.state;
            const map = new mapboxgl.Map({
                container: this.mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                //style: styles,
                center: [lng, lat],
                zoom: zoom,
                //scrollZoom: false
            });
            // add fullscreen button (top-right)
            map.addControl(new mapboxgl.FullscreenControl());
            // add navigation buttons (top-right)
            map.addControl(new mapboxgl.NavigationControl());
            // disable touchscreen?
            map.touchPitch.disable();
            // load emission inventory maps
            map.on('load', () => {
                map.addSource('boundary-rect', {
                    type: 'geojson',
                    data: {
                        properties: {},
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    [11.0, 48.50833],
                                    [12.2166, 48.50833],
                                    [12.2166, 47.7],
                                    [11.0, 47.7],
                                    [11.0, 48.50833],
                                ],
                            ],
                        },
                    },
                });
                map.addLayer({
                    id: 'boundary-rect',
                    type: 'line',
                    source: 'boundary-rect',
                    layout: {},
                    paint: {
                        'line-color': '#1E3A8A',
                        'line-width': 3,
                        'line-opacity': 0.7,
                    },
                });
                console.log("map is loaded") //not called
                this.setState({currentMap: map});
                // clean up on unmount
                return () => this.map.remove();
            }, []);
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