import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../../../Components/Form/Button";
import GeneralInformation from "./GeneralInformation";
import PhysicalInformation from "./PhysicalInformation";
import { postReq } from "../../../../Service/API";
import axios from "axios";
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
    latitude: z.any(),
    longitude: z.any(),
    landClassification: z
      .array(z.string())
      .nonempty("Land Classification is required"),
    economic: z.array(z.string()).nonempty("Major Economic Source is required"),
    brgyLogo: z.any(),
  });

  const [base64, setBase64] = useState("");
  const methods = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Assuming 'brgyLogo' holds the uploaded file

    // Append 'brgyLogo' to FormData

    // console.log(formData);
    const { latitude, longitude, ...restData } = data;

    // console.log(data);
    const payload = {
      address: "sdfsdfs",
      ...restData, // Spread the remaining form fields
      brgyLogo: base64,
      coordinates: [{ latitude: latitude }, { longitude: longitude }],
      // Include 'brgyLogo' in the payload
    };

    // Rest of your code for form data submission
    console.log(payload);

    try {
      const response = await axios.post(
        "https://dgra-system-e3fdea1a7cab.herokuapp.com/api/barangayprofile/barangayProfileInformation",
        payload
      );

      console.log(response);
      // Handle response
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://dgra-system-e3fdea1a7cab.herokuapp.com/api/barangayprofile/barangayProfileInformation"
      );
      console.log(response);
    };

    getData();
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <GeneralInformation />
          <PhysicalInformation base64Img={setBase64} />
          <CustomButton label={"Update"} type="Submit" />
        </form>
      </FormProvider>
    </>
  );
};

export default Form;
