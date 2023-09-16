import React from "react";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../Components/Form/Input";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Select from "../../../Components/Form/Select";
import landClassification from "../../../Data/landClassification.json";
import CustomTextArea from "../../../Components/Form/TextArea";
import Checkbox from "../../../Components/Form/Checkbox";
import Message from "../../../Components/UI/Message/Message";
const PhysicalInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const checkboxOptions = [
    { label: "Lowland", value: "lowland" },
    { label: "Upland", value: "upland" },
    { label: "Landlock", value: "landlock" },
    { label: "Coastal", value: "coastal" },
    { label: "Others", value: "others" },
  ];

  return (
    <CustomContainer title={"Physical Information"}>
      <CustomInput
        label="Total Land Area"
        errors={errors}
        {...register("totalLandArea")}
        type="text"
        className="formInput"
      />
      <Select
        label="Barangay Category"
        errors={errors}
        defaultOptionLabel="Choose Category"
        data={landClassification}
        {...register("barangayCategory")}
        className="formSelect"
      />

      <CustomTextArea
        label="Vision"
        errors={errors}
        {...register("vision")}
        type="text"
        className="formTextarea"
      />
      <CustomTextArea
        label="Mission"
        errors={errors}
        {...register("mission")}
        type="text"
        className="formTextarea"
      />

      {checkboxOptions.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          {...register("landClassification")}
          value={option.value}
        />
      ))}

      {/* <Checkbox
        label="Lowland"
        {...register("landClassification")}
        value="lowland"
      />
      <Checkbox
        label="Upland"
        {...register("landClassification")}
        value="upland"
      />
      <Checkbox
        label="Landlock"
        {...register("landClassification")}
        value="landlock"
      />
      <Checkbox
        label="Coastal"
        {...register("landClassification")}
        value="coastal"
      />
      <Checkbox
        label="Others"
        {...register("landClassification")}
        value="others"
      /> */}
      {errors.landClassification && (
        <>
          <Message
            label={errors.landClassification.message}
            className={"error"}
          />
        </>
      )}
    </CustomContainer>
  );
};

export default PhysicalInformation;
