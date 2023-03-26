import React from 'react';
import mapboxgl from '!mapbox-gl'; 

// set access token from environment variable
mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 11.56,
            lat: 48.135,
            zoom: 10,
            currentMap: null // should be the html element id of the map
        };
        this.mapContainer = React.createRef();
    }

    createMapLegend() {
        const layers = [
            '0-135',
            '135-400',
            '400-706',
            '706-1064',
            '1064-1582',
            '1582-1915',
            '1915-2248',
            '2248-3353'
        ];
        const colors = [
            '#FFF5F0',
            '#FEE0D2',
            '#FCBBA1',
            '#FC9272',
            '#FB6A4A',
            '#EF3B2C',
            '#CB181D',
            '#99000D'
        ];
        // create legend
        const legend = document.getElementById('legend');
        const titleItem = document.createElement('div');
        const titleKey = document.createElement('span');
        titleKey.innerHTML = 'CO₂ [t]';
        titleItem.appendChild(titleKey);
        legend.appendChild(titleItem);

        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
    }
    
        componentDidMount() {
            const { lng, lat, zoom, currentMap } = this.state;
            const map = new mapboxgl.Map({
                container: this.mapContainer.current,
                style: 'mapbox://styles/michael-suhendra/clfoky47x000001qw776e7oh7',
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
            // test event listener
            map.on('move', () => {
                this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
                });
            });
            // load emission inventory maps
            // (rectangular) border: [11.36077835, 48.06162486, 11.72290934, 48.2481186 ]
            map.on('load', () => {
                // make a pointer cursor
                map.getCanvas().style.cursor = 'default';
                // create legend
                this.createMapLegend();
                // data goes here
                // load all 12 maps

                // rectangular boundary around Munich
                map.addSource('boundary-rect', {
                    type: 'geojson',
                    data: {
                        properties: {},
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    [11.361, 48.248],
                                    [11.723, 48.248],
                                    [11.723, 48.062],
                                    [11.361, 48.062],
                                    [11.361, 48.248],
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
                        'line-width': 4,
                        'line-opacity': 0.7,
                    },
                });
                // set map
                this.setState({currentMap: map});
                // clean up on unmount
                return () => this.map.remove();
            });
        }

        render() {
            const { lng, lat, zoom } = this.state;
            return (
            <div>
                <h1 className="text-3xl font-bold underline">
                    TUM GNFR C Munich Emission Inventory
                </h1>
                <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />
                <div className='map-overlay' id='legend'></div>
            </div>
            );
        }

}