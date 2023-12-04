import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../../../Components/Form/Input";
import MapContainer from "../../../../../Utils/Map";
import "../../../../../Asset/Scss/Pages/ResidenceProfile/_householdLocation.scss";
import { fromLatLng, setKey, geocode, RequestType } from "react-geocode";
setKey("AIzaSyBlApZPTcG_IhHgjWCLdp-PKMiiM4xBAAM");
const HouseholdLocation = ({ selectedHousehold }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (selectedHousehold) {
      setValue("province", selectedHousehold.province);
      setValue("cityOrMunicipality", selectedHousehold.cityOrMunicipality);
      setValue("barangay", selectedHousehold.barangay);
      setValue("purokOrSitio", selectedHousehold.purokOrSitio);
      setValue("street", selectedHousehold.street);
      setValue("householdNo", selectedHousehold.id);
      setValue("nameOfRespondent", selectedHousehold.lastUser);
      setValue("contactNo", selectedHousehold.household.contact);
    }
  }, [selectedHousehold, setValue]);

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // For demonstration purposes, using static values
    setCoordinates({ lat: 14.6090537, lng: 121.0222565 });
  }, []);

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
  console.log(errors);
  return (
    <div>
      <h4>A. Household Location</h4>
      <div style={{ margin: "0 20px" }}>
        <CustomInput
          label="A.1 Province"
          className="formInputModalHousehold"
          errors={errors}
          {...register("province")}
        />
        <CustomInput
          label="A.2 Municipality"
          className="formInputModalHousehold"
          errors={errors}
          {...register("cityOrMunicipality")}
        />
        <CustomInput
          label="A.3 Barangay"
          className="formInputModalHousehold"
          errors={errors}
          {...register("barangay")}
        />
        <CustomInput
          label="A.4 Purok/Sitio"
          className="formInputModalHousehold"
          errors={errors}
          {...register("purokOrSitio")}
        />
        <CustomInput
          label="A.5 Street"
          className="formInputModalHousehold"
          errors={errors}
          {...register("street")}
        />
        <CustomInput
          label="A.6 House Identification Number"
          className="formInputModalHousehold"
          errors={errors}
          {...register("householdNo")}
        />
        {/* Map */}
        <label id="a7Label">A.7 Coordinates</label>
        <MapContainer
          coordinates={coordinates}
          onLocationChange={handleLocationChange}
        />
        <CustomInput
          label="Latitude"
          className="formInputModalHousehold"
          errors={errors}
          {...register("latitude")}
        />
        <CustomInput
          label="Longitude"
          className="formInputModalHousehold"
          errors={errors}
          {...register("longitude")}
        />
        <CustomInput
          label="A.8 Name of Respondent"
          className="formInputModalHousehold"
          errors={errors}
          {...register("nameOfRespondent")}
        />
        <CustomInput
          label="A.9 Household Contact Number add"
          className="formInputModalHousehold"
          errors={errors}
          {...register("contactNo")}
        />
      </div>
    </div>
  );
};

export default HouseholdLocation;
