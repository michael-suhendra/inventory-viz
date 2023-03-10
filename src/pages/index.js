import * as React from "react"
import ReactDOM from 'react-dom';
import { Link } from "gatsby";
import 'mapbox-gl/dist/mapbox-gl.css';

// This is the homepage
const IndexPage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">TUM GNFR C Munich Emission Inventory</h1>
      <div className="map-container">
        <button type="button" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <Link to="/App"> 
            <h2>Open map</h2> 
          </Link>
        </button>
      </div>
    </main>
  )
}

export const Head = () => <title>Home Page</title>

export default IndexPage