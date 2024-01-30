"use client";

// Importing the necessary modules
import React, { useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// Your component function (note the uppercase name)
const MyMap = () => {
  const containerStyle = {
    width: "80vh",
    height: "40vh",
  };

  // Memoize the center object to avoid unnecessary re-creations
  const center = useMemo(
    () => ({
      lat: 1.3521,
      lng: 103.8198,
    }),
    []
  ); // Empty dependency array since the center object never changes

  // Accessing the API key and mapId from environment variables
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // Add any additional libraries as needed
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  ); // Add center to the dependency array

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const mapOptions = useMemo(() => {
    if (typeof window !== "undefined" && process.env.MAP_ID) {
      // Use the StyledMapType to apply custom map styling
      const styledMapType = new window.google.maps.StyledMapType(
        [], // Your custom map style array
        { name: "Styled Map" }
      );

      return {
        mapTypeControlOptions: {
          mapTypeIds: ["roadmap", "satellite", "styled_map"],
        },
      };
    }
    return {};
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MyMap; // Export the component with the correct name
