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
const HouseholdCharacteristics = ({ selectedHousehold }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  useEffect(() => {
    if (selectedHousehold) {
      // If editing an event, set form values using setValue
      setValue("noFamilies", selectedHousehold.families);
      setValue("noHouseholdMembers", selectedHousehold.members);
      setValue("hasDisability", selectedHousehold.hasDisability);
      setValue("noMembersDisability", selectedHousehold.noMembersDisability);
      setValue("typeOfBuilding", selectedHousehold.typeOfBuilding);
      setValue("mainWaterSupply", selectedHousehold.mainWaterSupply);
      setValue("toiletFacType", selectedHousehold.toiletFacType);
      setValue("hasWaterFiltration", selectedHousehold.hasWaterFiltration);
      setValue("sourceOfElectricity", selectedHousehold.sourceOfElectricity);
      setValue("hasPowerGenerator", selectedHousehold.hasPowerGenerator);
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
        />
        <CustomInput
          label="B.2 How many household member are there in the household?"
          className="formInputModalHouseholdCharacteristics"
          errors={errors}
          {...register("noHouseholdMembers")}
        />
        {/* B3 Select */}
        <Select
          label="B.3 Is there any of the members of the household with disability?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("hasDisability")}
          className="formSelectModalHouseholdCharacteristics"
        />
        <CustomInput
          label="B.4 [If Yes in Question No B.3] How many?"
          className="formInputModalHouseholdCharacteristics"
          errors={errors}
          {...register("noMembersDisability")}
        />
        <Select
          label="B.5 In what type of building does the household reside?"
          errors={errors}
          defaultOptionLabel="Choose Type"
          data={buildingType}
          {...register("typeOfBuilding")}
          className="formSelectModalHouseholdCharacteristics"
        />
        <Select
          label="B.6 What is the household's main sourse of water supply?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={waterSupply}
          {...register("mainWaterSupply")}
          className="formSelectModalHouseholdCharacteristics"
        />
        <Select
          label="B.7 What type of toilet facility does the household have?"
          errors={errors}
          defaultOptionLabel="Choose Type"
          data={toiletFacility}
          {...register("toiletFacType")}
          className="formSelectModalHouseholdCharacteristics"
        />
        <Select
          label="B.8 Does the household have water filtration?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("hasWaterFiltration")}
          className="formSelectModalHouseholdCharacteristics"
        />

        <Select
          label="B.9 What is the source of electricity in the housing unit?"
          errors={errors}
          defaultOptionLabel="Choose Source"
          data={SourceOfElectricity}
          {...register("sourceOfElectricity")}
          className="formSelectModalHouseholdCharacteristics"
        />
        <Select
          label="B.10 Is there a back-up power generator/battery?"
          errors={errors}
          defaultOptionLabel="Choose Option"
          data={YesNo}
          {...register("hasPowerGenerator")}
          className="formSelectModalHouseholdCharacteristics"
        />
      </div>
    </div>
  );
};

export default HouseholdCharacteristics;
