import { GoogleMap } from "@react-google-maps/api";
import React, { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = () => {
  const coordinates = useState({ lat: 14.6090537, lng: 121.0222565 });

  const [getBy, setGetBy] = useState("Address");

  function handleChange(e) {
    setGetBy(e.target.value);
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={10}
      ></GoogleMap>
    </>
  );
};

export default Map;
