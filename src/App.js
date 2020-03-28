import React, { useState, Component } from 'react';
import './App.css';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpY2VtYTE1IiwiYSI6ImNrMG12MzRmNzAxNXIzY213MnptMWphb3kifQ.-IsJGRvnmpVcOanXURrbKg';

// import MDXDocument from './Content.mdx';

{/*import ReactMapGL from 'react-map-gl';

function App() {

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });   

  return (
    <div className="App">
      {/*<MDXDocument />
      <ReactMapGL 
        mapboxApiAccessToken={'pk.eyJ1IjoiYWxpY2VtYTE1IiwiYSI6ImNrMG12MzRmNzAxNXIzY213MnptMWphb3kifQ.-IsJGRvnmpVcOanXURrbKg'}
        {...viewport}
        onViewportChange={setViewport}
      />
    </div>
  );
}

export default App;*/}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: -99.9,
    lat: 41.5,
    zoom: 3
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('load', function() {
      map.addSource('counties', {
        'type': 'vector',
        'url': 'mapbox://mapbox.82pkq93d'
      });

      map.addLayer({
        'id': 'counties',
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'original',
        'paint': {
          'fill-outline-color': 'rgba(0,0,0,0.1)',
          'fill-color': 'rgba(0,0,0,0.1)'
        }
      });

      map.addLayer({
        'id': 'counties-highlighted',
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'original',
        'paint': {
          'fill-outline-color': '#484896',
          'fill-color': '#6e599f',
          'fill-opacity': 0.75          
        },
        'filter': ['in', 'COUNTY', '']
      });

      map.on('mousemove', function(e) {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['counties']
        });

        map.getCanvas().style.cursor = features.length ? 'pointer' : '';

        if (!features.length) { return; }

        const feature = features[0];
        map.setFilter('counties-highlighted', ['==', 'FIPS', feature.properties.FIPS]);
      });
    });
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} 
          className="mapContainer" />
      </div>    
    );
  }

}

export default App;