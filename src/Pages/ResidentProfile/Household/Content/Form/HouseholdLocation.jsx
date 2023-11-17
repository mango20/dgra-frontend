import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../../../Components/Form/Input";
import MapContainer from "../../../../../Utils/Map";
import "../../../../../Asset/Scss/Pages/ResidenceProfile/_householdLocation.scss";
const HouseholdLocation = ({ selectedHousehold }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (selectedHousehold) {
      // If editing an event, set form values using setValue
      setValue("province", selectedHousehold.province);
      setValue("municipality", selectedHousehold.municipality);
      setValue("barangay", selectedHousehold.barangay);
      setValue("purok", selectedHousehold.purok);
      setValue("street", selectedHousehold.street);
      setValue("houseIdentificationNumber", selectedHousehold.id);
      setValue("respondentName", selectedHousehold.lastUser);
      setValue("contactNumber", selectedHousehold.household.contact);
    }
  }, [selectedHousehold, setValue]);

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Fetch coordinates from an API or any other source
    // For demonstration purposes, using static values
    setCoordinates({ lat: 37.7749, lng: -122.4194 });
  }, []);
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
          {...register("municipality")}
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
          {...register("purok")}
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
          {...register("houseIdentificationNumber")}
        />
        {/* Map */}
        <label id="a7Label">A.7 Coordinates</label>
        <MapContainer coordinates={coordinates} />
        <CustomInput
          label="A.8 Name of Respondent"
          className="formInputModalHousehold"
          errors={errors}
          {...register("respondentName")}
        />
        <CustomInput
          label="A.9 Household Contact Number add"
          className="formInputModalHousehold"
          errors={errors}
          {...register("contactNumber")}
        />
      </div>
    </div>
  );
};

export default HouseholdLocation;
