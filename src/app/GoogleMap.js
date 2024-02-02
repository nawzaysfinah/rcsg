import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";

const MyMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) {
        console.error("Map container is null.");
        return;
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const initialPosition = {
        lat: 1.3521,
        lng: 103.8198,
      };

      const mapOptions = {
        center: initialPosition,
        zoom: 11.5,
        mapID: process.env.MAP_ID,
      };

      // Check if mapRef.current is a valid HTML element
      if (mapRef.current instanceof HTMLElement) {
        // setup the map
        const map = new Map(mapRef.current, mapOptions);

        // array of marker positions
        const markerPositions = [
          {
            lat: 1.3222529807872585,
            lng: 103.81460427422135,
            title: "Botanic Gardens, Exit A",
          },
          {
            lat: 1.3044625719176155,
            lng: 103.85302765317296,
            title: "Rochor, Exit B",
          },
          {
            lat: 1.307335850672915,
            lng: 103.7907067875239,
            title: "Buona Vista, Exit A",
          },
          {
            lat: 1.293263705343925,
            lng: 103.83379908839584,
            title: "Great World, Exit 1",
          },
          {
            lat: 1.2797478229738812,
            lng: 103.86796701960978,
            title: "Gardens by the Bay MRT",
          },
          {
            lat: 1.3013385316209811,
            lng: 103.91291265207634,
            title: "McDonalds Marine Cove",
          },
          {
            lat: 1.4072224761912058,
            lng: 103.82856470843778,
            title: "Behind Waterway Point",
          },
          {
            lat: 1.367671784546475,
            lng: 103.90234282532347,
            title: "Bishan Park 1",
          },
          {
            lat: 1.4112468194481633,
            lng: 103.77837388399611,
            title: "Mandai T15 Trail",
          },

          // add more markers as needed
        ];

        // add markers to the map
        markerPositions.forEach((position) => {
          // Emoji character as the label content
          const emojiIcon = "🥩";

          // Create a marker with emoji content and adjust the labelOrigin
          new google.maps.Marker({
            position,
            map,
            title: position.title,
            label: {
              text: emojiIcon,
              color: "green", // Set label color to transparent
              fontSize: "24px", // Set the font size as needed
              fontWeight: "bold",
              labelOrigin: new google.maps.Point(0, 0), // Set label origin to remove background
            },
          });
        });
      } else {
        console.error("Map container is not a valid HTML element.");
      }
    };

    initMap();
  }, []); // Add an empty dependency array to execute the effect only once on mount

  return (
    <div
      style={{ height: "40vh", width: "70vh", borderRadius: "10px" }}
      ref={mapRef}
    >
      {/* The map container */}
    </div>
  );
};

export default MyMap;
