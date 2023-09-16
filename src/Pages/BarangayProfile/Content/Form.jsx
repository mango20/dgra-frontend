import React from "react";
import CustomButton from "../../../Components/Form/Button";
import PhysicalInformation from "./PhysicalInformation";
import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "./GeneralInformation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../Components/UI/Modal/CustomModal";
import { Button } from "react-bootstrap";
import CustomInput from "../../../Components/Form/Input";

const Form = () => {
  const schema = z.object({
    barangay: z.string().nonempty("Barangay is required"),
    municipality: z.string().nonempty("Municipality is required"),
    province: z.string().nonempty("Province is required"),
    region: z.string().nonempty("Region is required"),
    totalLandArea: z.string().nonempty("Total Land Area is required"),
    barangayCategory: z.string().nonempty("Barangay Category is required"),
    vision: z.string().nonempty("Vision is required"),
    mission: z.string().nonempty("Mission is required"),
    landClassification: z
      .array(z.string())
      .nonempty("Land Classification is required"),
  });

  const methods = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <GeneralInformation />
          <PhysicalInformation />
          <CustomButton label={"Update"} type={"Submit"} />
        </form>
      </FormProvider>
    </>
  );
};

export default Form;
