import React from "react";
import { useFormContext } from "react-hook-form";
import landClassification from "../../../../Data/landClassification.json";
import CustomInput from "../../../../Components/Form/Input";
import Select from "../../../../Components/Form/Select";
import Message from "../../../../Components/UI/Message/Message";
import Checkbox from "../../../../Components/Form/Checkbox";
import CustomContainer from "../../../../Layout/Container/CustomContainer";
import CustomTextArea from "../../../../Components/Form/TextArea";
const PhysicalInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const landClassificationOption = [
    { label: "Lowland", value: "lowland" },
    { label: "Upland", value: "upland" },
    { label: "Landlock", value: "landlock" },
    { label: "Coastal", value: "coastal" },
    { label: "Others", value: "others" },
  ];

  const economicOption = [
    { label: "Agricultural", value: "agricultural" },
    { label: "Fishing", value: "fishing" },
    { label: "Industrial", value: "industrial" },
    { label: "Commercial", value: "commercial" },
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
      {/* land Classification */}{" "}
      <div className="checkboxGroups">
        <label>Land Classification</label>{" "}
        <div className="checkboxGroupsInner">
          {landClassificationOption.map((option) => (
            <div key={option.value}>
              <Checkbox
                key={option.value}
                label={option.label}
                {...register("landClassification")}
                value={option.value}
              />
            </div>
          ))}
          <div className="errCheckDiv">
            {errors.landClassification && (
              <>
                <Message
                  label="Land Classification is required"
                  className={"error"}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="checkboxGroups">
        <label>Major Economic Source</label>
        <div className="checkboxGroupsInner">
          {economicOption.map((option) => (
            <div key={option.value}>
              <Checkbox
                label={option.label}
                {...register("economic")}
                value={option.value}
              />
            </div>
          ))}
          <div className="errCheckDiv">
            {errors && errors.economic && (
              <Message
                label="Major Economic Source is required"
                className={"error"}
              />
            )}
          </div>
        </div>
      </div>
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
    </CustomContainer>
  );
};

export default PhysicalInformation;
