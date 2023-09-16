import React from "react";
import CustomInput from "../../../Components/Form/Input";
import { useFormContext } from "react-hook-form";
import CustomContainer from "../../../Layout/Container/CustomContainer";

const GeneralInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <CustomContainer title={"General Information"}>
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
