import React, { useState, FunctionComponent } from 'react';
import {
  GoogleMap as GoogleMapAPI,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import cn from 'classnames';
import useAsyncEffect from 'use-async-effect';
import { formatWithAws } from '@utils';
import styles from './Map.module.scss';

interface Coords {
  lat: number;
  lng: number;
}

interface PathProps {
  address: string;
  className?: string;
}

const GoogleMap: FunctionComponent<PathProps> = ({ address, className }) => {
  const [center, setCenter] = useState<Coords>({ lat: 32.8801, lng: -117.234 }); // TODO this is no good. We need to have a loading symbol in the map when this is not set. Solution: Keep track of when the center is set from useEffect (use a var with useState). If it hasn't been set yet, then instead of showing the mapPin, show the loading gif
  const [zoom, setZoom] = useState(14);

  useAsyncEffect(
    async (isMounted) => {
      const code = await geocodeByAddress(address);
      const location = await getLatLng(code[0]);

      // cannot update state if unmounted (can occur during the asynchronous call)
      if (isMounted()) setCenter(location);
    },
    [address, setCenter],
  );

  const GoogleMapRender = withGoogleMap(() => (
    <GoogleMapAPI center={center} defaultZoom={zoom}>
      <Marker
        position={center}
        icon={{
          url: formatWithAws('assets/mapPin.svg'),
          anchor: new google.maps.Point(17, 46),
        }}
      />
    </GoogleMapAPI>
  ));

  return (
    <div className={cn(styles.wrapper, className)}>
      <GoogleMapRender
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};

export default GoogleMap;
