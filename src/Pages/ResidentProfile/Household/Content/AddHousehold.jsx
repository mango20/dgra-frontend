import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../Components/Form/Input";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import HouseholdLocation from "./Form/HouseholdLocation";
import HouseholdCharacteristics from "./Form/HouseholdCharacteristics";
import { postReq } from "../../../../Service/API";

const AddHousehold = ({
  addHousehold,
  closeModal,
  editHouseholdModal,
  selectedHousehold,
  alertMsg,
  onItemAddedOrUpdated,
  viewHousehold,
  viewOnly,
}) => {
  const schema = z.object({
    province: z.string().nonempty("Province is required"),
    cityOrMunicipality: z.string().nonempty("City/Municipality is required"),
    barangay: z.string().nonempty("Barangay is required"),
    street: z.string().nonempty("Street is required"),
    purokOrSitio: z.string().nonempty("Purok/Sitio is required"),
    householdNo: z.string().nonempty("Household number is required"),
    latitude: z.string().nonempty("Latitude is required"),
    longitude: z.string().nonempty("Longitude is required"),
    nameOfRespondent: z.string().nonempty("Name of respondent is required"),
    contactNo: z.string().nonempty("Contact number is required"),
    noFamilies: z.string().nonempty("Number of families is required"),
    noHouseholdMembers: z
      .string()
      .nonempty("Number of household members is required"),
    hasDisability: z.string().nonempty("Disability information is required"),
    noMembersDisability: z.string().optional(),
    typeOfBuilding: z.string().nonempty("Type of building is required"),
    mainWaterSupply: z.string().nonempty("Main water supply is required"),
    toiletFacType: z.string().nonempty("Toilet facility type is required"),
    hasWaterFiltration: z
      .string()
      .nonempty("Water filtration information is required"),
    sourceOfElectricity: z
      .string()
      .nonempty("Source of electricity is required"),
    hasPowerGenerator: z
      .string()
      .nonempty("Power generator information is required"),
  });

  const methods = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const {
      latitude,
      longitude,
      noFamilies,
      noHouseholdMembers,
      hasDisability,
      noMembersDisability,
      typeOfBuilding,
      mainWaterSupply,
      toiletFacType,
      hasWaterFiltration,
      sourceOfElectricity,
      hasPowerGenerator,
      ...restData
    } = data;

    const householdCharacteristics = {
      noFamilies,
      noHouseholdMembers,
      hasDisability,
      noMembersDisability,
      typeOfBuilding,
      mainWaterSupply,
      toiletFacType,
      hasWaterFiltration,
      sourceOfElectricity,
      hasPowerGenerator,
    };

    const payload = {
      coordinates: { latitude, longitude },
      householdCharacteristics,
      status: "Active",
      ...restData,
    };

    if (selectedHousehold) {
      // Logic to update the existing event
      console.log("Edit event data:", data);
    } else {
      try {
        const response = await postReq("/api/household", payload);
        console.log(response);
        alertMsg(response.message);
        onItemAddedOrUpdated();
        closeModal();
      } catch (error) {
        console.log(error);
      }
      console.log(payload);
    }
    console.log(data);
  };

  console.log(" Select ", selectedHousehold);
  console.log(viewOnly);
  let modalTitle = selectedHousehold ? "Edit Household" : "Add Household";
  if (viewOnly && selectedHousehold && selectedHousehold.householdNo) {
    modalTitle = `View ${selectedHousehold.householdNo}`;
  }

  return (
    <CustomModal
      size="lg"
      show={addHousehold || editHouseholdModal || (viewHousehold && viewOnly)}
      handleClose={closeModal}
      title={modalTitle}
      viewOnly={viewOnly}
      handleAction={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <form>
          <HouseholdLocation
            viewOnly={viewOnly}
            selectedHousehold={selectedHousehold}
            edit={editHouseholdModal}
          />
          <HouseholdCharacteristics
            viewOnly={viewOnly}
            selectedHousehold={selectedHousehold}
            edit={editHouseholdModal}
          />
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default AddHousehold;
