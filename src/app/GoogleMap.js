import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";

const MyMap = () => {
  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [position, setPosition] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) {
        console.error("Map container is null.");
        return;
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"], // Load the Places API
      });

      const { Map } = await loader.importLibrary("maps");

      const initialPosition = {
        lat: 1.3521,
        lng: 103.8198,
      };

      const mapOptions = {
        center: initialPosition,
        zoom: 11,
        mapID: process.env.MAP_ID,
      };

      const map = new Map(mapRef.current, mapOptions);

      // Initialize Directions Service
      directionsService.current = new google.maps.DirectionsService();

      // Create marker for start & end positions
      const startMarker = new Marker({
        map,
        animation: google.maps.Animation.DROP,
      });

      setStartMarker(startMarker);

      map.addListener("click", (event) => {
        const clickedLatLng = event.latLng.toJSON();

        if (!origin) {
          setOrigin(clickedLatLng);
          // startMarker.setPosition(clickedLatLng);
        } else if (!destination) {
          setDestination(clickedLatLng);
        } else {
          // Reset if both origin and destination are already set
          setOrigin(clickedLatLng);
          setDestination(null);
        }
      });

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
          title: "McDonald's Marine Cove",
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

      // Emojis used for markers
      const meet = {
        url: "https://em-content.zobj.net/source/microsoft-teams/337/star_2b50.png",
        scaledSize: new google.maps.Size(30, 30), // Set the desired size in pixels
      };
      const start = {
        url: "https://em-content.zobj.net/source/microsoft-teams/363/backhand-index-pointing-down_medium-light-skin-tone_1f447-1f3fc_1f3fc.png",
        scaledSize: new google.maps.Size(30, 30), // Set the desired size in pixels
      };
      const end = {
        url: "https://openmoji.org/data/color/svg/1F3C1.svg",
        scaledSize: new google.maps.Size(50, 50), // Set the desired size in pixels
      };

      // add markers to the map
      markerPositions.forEach((position) => {
        // Emoji character as the label content

        // Create a marker with emoji content and adjust the labelOrigin
        new google.maps.Marker({
          position,
          map,
          title: position.title,
          icon: meet,
          label: {
            color: "green", // Set label color to transparent
            fontSize: "24px", // Set the font size as needed
            fontWeight: "bold",
            labelOrigin: new google.maps.Point(0, 0), // Set label origin to remove background
          },
        });
      });

      // Display markers for origin and destination
      if (origin) {
        new google.maps.Marker({
          position: origin,
          map,
          animation: google.maps.Animation.DROP,
          title: "Origin",
          icon: start,
          label: {
            color: "blue",
            fontSize: "30px", // Set the font size as needed
            fontWeight: "bold",
            fillColor: "transparent",
          },
        });
      }

      if (destination) {
        new google.maps.Marker({
          position: destination,
          map,
          animation: google.maps.Animation.DROP,
          title: "Destination",
          icon: end,
          label: {
            color: "red",
            fontSize: "30px", // Set the font size as needed
            fontWeight: "bold",
          },
        });
      }

      // Generate directions if both origin and destination are set
      if (origin && destination) {
        calculateAndDisplayRoute(
          directionsService.current,
          map,
          origin,
          destination
        );
      }

      // Add Place Autocomplete to origin and destination inputs
      const originAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById("origin-input")
      );
      originAutocomplete.setFields(["geometry", "name"]);

      originAutocomplete.addListener("place_changed", () => {
        const place = originAutocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          setOriginInput(place.name);
          setOrigin(place.geometry.location.toJSON());
        }
      });

      const destinationAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById("destination-input")
      );
      destinationAutocomplete.setFields(["geometry", "name"]);

      destinationAutocomplete.addListener("place_changed", () => {
        const place = destinationAutocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          setDestinationInput(place.name);
          setDestination(place.geometry.location.toJSON());
        }
      });
    };

    initMap();
  }, [origin, destination]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // No need to manually geocode with Autocomplete

    // Generate directions if both origin and destination are set
    if (origin && destination) {
      calculateAndDisplayRoute(
        directionsService.current,
        mapRef.current,
        origin,
        destination
      );
    }
  };

  // Function to calculate and display route
  const calculateAndDisplayRoute = (
    directionsService,
    map,
    origin,
    destination
  ) => {
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.BICYCLING,
      },
      (response, status) => {
        if (status === "OK") {
          const route = response.routes[0];
          const legs = route.legs;

          // Extract distance from the first leg (assuming one route)
          const totalDistance = legs.reduce(
            (sum, leg) => sum + leg.distance.value,
            0
          );

          // Convert meters to kilometers (or adjust as needed)
          const distanceInKm = totalDistance / 1000;

          // Set the distance to state
          setDistance(distanceInKm.toFixed(2));
          new google.maps.DirectionsRenderer({
            map,
            directions: response,
            suppressMarkers: true, // Prevent default markers
          });
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  return (
    <div className="mb-32 text-center max-w-full lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      <div className="flex">
        <form className="w-full max-w-lg" onSubmit={handleFormSubmit}>
          <div>
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <button
                className="bg-transparent hover:text-green-500 text-white font-bold"
                type="submit"
              >
                Get Directions
              </button>{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 grid-cols-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="origin-input"
              >
                {/* 🥩{" "} */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="origin-input"
                type="text"
                placeholder="🥩 Start"
                value={originInput}
                onChange={(e) => setOriginInput(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="destination-input"
              >
                {/* 🏁{" "} */}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="destination-input"
                type="text"
                placeholder="🏁 End"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
              />
            </div>
          </div>
        </form>
        {distance && (
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 text-grey-100 text-2xl font-semibold text-center">
            <p>📏 : {distance} km</p>
          </div>
        )}
      </div>

      <div
        className="w-full sm:w-full md:w-11/12 h-96 justify-items-center"
        style={{
          borderRadius: "10px",
          marginTop: "10px",
          cursor: "pointer",
        }}
        // Set default mouse to pointer
        onMouseEnter={() => {
          // Change the cursor style when the mouse enters the map area
          mapRef.current.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          // Reset the cursor style when the mouse leaves the map area
          mapRef.current.style.cursor = "default";
        }}
        ref={mapRef}
      >
        {/* The map container */}
      </div>
    </div>
  );
};

export default MyMap;
