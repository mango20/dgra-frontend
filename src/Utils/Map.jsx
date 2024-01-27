import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
const libraries = ["places"];
const mapContainerStyle = {
  height: "500px",
  marginBottom: "25px",
};
const defaultCenter = {
  lat: 0, // default latitude
  lng: 0, // default longitude
};
const MapContainer = ({ coordinates, onLocationChange, readOnly }) => {
  console.log(readOnly);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(10);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlApZPTcG_IhHgjWCLdp-PKMiiM4xBAAM", // Replace with your API key
    libraries,
  });

  const setCoordinates = (coords) => {
    setMapCenter(coords);
  };

  useEffect(() => {
    if (coordinates) {
      setCoordinates(coordinates);
      setMapZoom(14); // Adjust zoom level as needed
    }
  }, [coordinates]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const onMarkerDragEnd = (event) => {
    if (!readOnly) {
      const { latLng } = event;
      const lat = latLng.lat();
      const lng = latLng.lng();
      onLocationChange({ lat, lng });
      setCoordinates({ lat, lng });
    }
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapZoom}
        center={mapCenter}
      >
        {coordinates && (
          <Marker
            position={coordinates}
            draggable={!readOnly}
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
