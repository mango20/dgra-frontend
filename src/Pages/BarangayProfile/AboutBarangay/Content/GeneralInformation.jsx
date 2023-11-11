import React from "react";
import { useFormContext } from "react-hook-form";
import CustomInput from "../../../../Components/Form/Input";
import CustomContainer from "../../../../Layout/Container/CustomContainer";
import Map from "../../../../Utils/Map";

const GeneralInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <CustomContainer title={"General Information"}>
      {/* <Map /> */}
      <div style={{ height: "500px" }}></div>
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
