import { memo, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
  lat: -34.592409765174374,
  lng: -58.39356461166401,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBZ04pkDk0S98NwH5on-oy8a0ZNS2f2OsU',
  });

  // const [, setMap] =useState(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    // setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    // setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerClassName="rounded-3xl shadow-2xl  responsive-map w-full lg:basis-1/2">
      <Marker
        position={{ lat: -34.592409765174374, lng: -58.39356461166401 }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MyComponent);
