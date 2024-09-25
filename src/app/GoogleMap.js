import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MyMap = () => {
  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || mapLoaded) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          "marker"
        );

        const initialPosition = { lat: 1.3521, lng: 103.8198 };
        const mapOptions = {
          center: initialPosition,
          zoom: 11,
          mapId: process.env.NEXT_PUBLIC_MAP_ID,
        };

        const map = new Map(mapRef.current, mapOptions);
        directionsService.current = new google.maps.DirectionsService();

        // ... (rest of your map initialization code)

        setMapLoaded(true);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [mapLoaded]);

  // ... (rest of your component code)

  return (
    <div className="mb-32 text-center max-w-full lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      {/* ... (your existing JSX) */}
      <div
        className="w-full sm:w-full md:w-11/12 h-96 justify-items-center"
        style={{
          borderRadius: "10px",
          marginTop: "10px",
          cursor: "pointer",
        }}
        ref={mapRef}
      >
        {/* The map container */}
      </div>
    </div>
  );
};

export default MyMap;
