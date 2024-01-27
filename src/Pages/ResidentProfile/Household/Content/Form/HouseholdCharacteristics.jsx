import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../../../Components/Form/Input";
import Select from "../../../../../Components/Form/Select";
import landClassification from "../../../../../Data/landClassification.json";
import YesNo from "../../../../../Data/YesNo.json";
import SourceOfElectricity from "../../../../../Data/SourceOfElectricity.json";
import buildingType from "../../../../../Data/buildingType.json";
import waterSupply from "../../../../../Data/waterSupply.json";
import toiletFacility from "../../../../../Data/toiletFacility.json";
const HouseholdCharacteristics = ({ selectedHousehold, edit, viewOnly }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  useEffect(() => {
    if (selectedHousehold || edit) {
      // If editing an event, set form values using setValue
      setValue(
        "noFamilies",
        selectedHousehold.householdCharacteristics[0]?.noFamilies
      );
      setValue(
        "noHouseholdMembers",
        selectedHousehold.householdCharacteristics[0]?.noHouseholdMembers
      );
      setValue(
        "hasDisability",
        selectedHousehold.householdCharacteristics[0]?.hasDisability
      );
      setValue(
        "noMembersDisability",
        selectedHousehold.householdCharacteristics[0]?.noMembersDisability
      );
      setValue(
        "typeOfBuilding",
        selectedHousehold.householdCharacteristics[0]?.typeOfBuilding
      );
      setValue(
        "mainWaterSupply",
        selectedHousehold.householdCharacteristics[0]?.mainWaterSupply
      );
      setValue(
        "toiletFacType",
        selectedHousehold.householdCharacteristics[0]?.toiletFacType
      );
      setValue(
        "hasWaterFiltration",
        selectedHousehold.householdCharacteristics[0]?.hasWaterFiltration
      );
      setValue(
        "sourceOfElectricity",
        selectedHousehold.householdCharacteristics[0]?.sourceOfElectricity
      );
      setValue(
        "hasPowerGenerator",
        selectedHousehold.householdCharacteristics[0]?.hasPowerGenerator
      );
    } else {
      setValue("noFamilies", "");
      setValue("noHouseholdMembers", "");
      setValue("hasDisability", "");
      setValue("noMembersDisability", "");
      setValue("typeOfBuilding", "");
      setValue("mainWaterSupply", "");
      setValue("toiletFacType", "");
      setValue("hasWaterFiltration", "");
      setValue("sourceOfElectricity", "");
      setValue("hasPowerGenerator", "");
    }
  }, [selectedHousehold, setValue]);

  return (
    <div>
      <h4>B. Household Characteristics</h4>
      <div style={{ margin: "0 20px" }}>
        <CustomInput
          label="B.1 How many families are there in the household?"
          className="formInputModalHouseholdCharacteristics"
          errors={errors}
          {...register("noFamilies")}
          readOnly={viewOnly}
        />
        <CustomInput
          label="B.2 How many household member are there in the household?"
          className="formInputModalHouseholdCharacteristics"
          errors={errors}
          {...register("noHouseholdMembers")}
          readOnly={viewOnly}
        />
        {/* B3 Select */}
        <Select
          label="B.3 Is there any of the members of the household with disability?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("hasDisability")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />
        <CustomInput
          label="B.4 [If Yes in Question No B.3] How many?"
          className="formInputModalHouseholdCharacteristics"
          errors={errors}
          {...register("noMembersDisability")}
          readOnly={viewOnly}
        />
        <Select
          label="B.5 In what type of building does the household reside?"
          errors={errors}
          defaultOptionLabel="Choose Type"
          data={buildingType}
          {...register("typeOfBuilding")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />
        <Select
          label="B.6 What is the household's main sourse of water supply?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={waterSupply}
          {...register("mainWaterSupply")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />
        <Select
          label="B.7 What type of toilet facility does the household have?"
          errors={errors}
          defaultOptionLabel="Choose Type"
          data={toiletFacility}
          {...register("toiletFacType")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />
        <Select
          label="B.8 Does the household have water filtration?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("hasWaterFiltration")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />

        <Select
          label="B.9 What is the source of electricity in the housing unit?"
          errors={errors}
          defaultOptionLabel="Choose Source"
          data={SourceOfElectricity}
          {...register("sourceOfElectricity")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />
        <Select
          label="B.10 Is there a back-up power generator/battery?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("hasPowerGenerator")}
          className="formSelectModalHouseholdCharacteristics"
          readOnly={viewOnly}
        />
      </div>
    </div>
  );
};

export default HouseholdCharacteristics;
