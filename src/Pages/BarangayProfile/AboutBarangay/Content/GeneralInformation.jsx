import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../../Components/Form/Input";
import CustomContainer from "../../../../Layout/Container/CustomContainer";
import Map from "../../../../Utils/Map";
import MapContainer from "../../../../Utils/Map";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { fromLatLng, setKey, geocode, RequestType } from "react-geocode";
setKey("AIzaSyBlApZPTcG_IhHgjWCLdp-PKMiiM4xBAAM");
const GeneralInformation = ({ data }) => {
  console.log(data);
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    setCoordinates({ lat: 14.6090537, lng: 121.0222565 });

    if (data) {
      setValue("address", data[0].address || "");
      setValue("latitude", data[0].coordinates?.latitude || "");
      setValue("longitude", data[0].coordinates?.longitude || "");
      setValue("barangay", data[0].barangay || "");
      setValue("municipality", data[0].municipality || "");
      setValue("province", data[0].province || "");
      setValue("region", data[0].region || "");
    }
  }, [data, setValue]);

  const handleLocationChange = ({ lat, lng }) => {
    setValue("latitude", lat.toString()); // Change "lat" to "latitude"
    setValue("longitude", lng.toString());

    fromLatLng(lat.toString(), lng.toString())
      .then((response) => {
        const address = response.results[0].formatted_address;
        setValue("address", address);

        geocode(RequestType.LATLNG, `${lat},${lng}`)
          .then(({ results }) => {
            const addressFromLatLng = results[0].formatted_address;
            console.log(addressFromLatLng);
          })
          .catch(console.error);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  return (
    <CustomContainer title={"General Information"}>
      {/* <Map /> */}
      <MapContainer
        coordinates={coordinates}
        onLocationChange={handleLocationChange}
      />
      <CustomInput
        label="Address"
        errors={errors}
        {...register("address")}
        type="text"
        className="formInput"
      />
      <CustomInput
        label="Geographical Location"
        errors={errors}
        {...register("latitude")}
        type="text"
        className="formInput"
      />
      <CustomInput
        customLabel="long"
        errors={errors}
        {...register("longitude")}
        type="text"
        className="formInput"
      />

      <CustomInput
        label="Barangay"
        errors={errors}
        {...register("barangay")}
        type="text"
        className="formInput"
      />
      <CustomInput
        label="Municipality"
        errors={errors}
        {...register("municipality")}
        type="text"
        className="formInput"
      />
      <CustomInput
        label="Province"
        errors={errors}
        {...register("province")}
        type="text"
        className="formInput"
      />
      <CustomInput
        label="Region"
        errors={errors}
        {...register("region")}
        type="text"
        className="formInput"
      />
    </CustomContainer>
  );
};

export default GeneralInformation;
