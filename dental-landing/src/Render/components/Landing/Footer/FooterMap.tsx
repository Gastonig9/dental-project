import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";



const center = {
  lat: -34.592409765174374,
  lng: -58.39356461166401,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBZ04pkDk0S98NwH5on-oy8a0ZNS2f2OsU",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerClassName="rounded-3xl shadow-2xl  responsive-map"
    >
      <Marker
        position={{ lat: -34.592409765174374, lng: -58.39356461166401 }}
      
      />

    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
