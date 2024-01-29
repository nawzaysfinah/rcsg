"use client";

// import logo from "./logo.svg";
import "./App.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// const apiKey = process.env.PUBLIC_GOOGLE_MAPS_API_KEY

function App() {
  // Singapore Coordinates : 1.3521° N, 103.8198° E
  const position = { lat: 1.35, lng: 103.82 };
  return (
    <APIProvider apiKey={process.env.PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh" }}>
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
