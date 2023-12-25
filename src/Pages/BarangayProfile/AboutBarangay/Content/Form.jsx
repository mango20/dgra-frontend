import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../../../Components/Form/Button";
import GeneralInformation from "./GeneralInformation";
import PhysicalInformation from "./PhysicalInformation";
import { postReq } from "../../../../Service/API";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBrgyProfile } from "../../../../Service/Action/BrgyProfileSlice";

const Form = () => {
  const dispatch = useDispatch();
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

  //no lat and long not updating

  const [base64, setBase64] = useState("");
  const methods = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    const { latitude, longitude, ...restData } = data;

    const payload = {
      address: "sdfsdfs",
      brgyLogo: base64,
      ...restData,
      coordinates: { latitude, longitude },
    };

    const apiUrl =
      "https://dgra-system-e3fdea1a7cab.herokuapp.com/api/barangayprofile/barangayProfileInformation";

    try {
      let response;

      if (fetchedData && fetchedData.length > 0) {
        const _id = fetchedData[0]._id;

        response = await axios.patch(`${apiUrl}?_id=${_id}`, payload);
      } else {
        response = await axios.post(apiUrl, payload);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://dgra-system-e3fdea1a7cab.herokuapp.com/api/barangayprofile/barangayProfileInformation`
        );
        console.log(response);
        setFetchedData(response.data.getInfo);
        dispatch(setBrgyProfile(response.data?.getInfo[0]));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  console.log(base64);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <GeneralInformation data={fetchedData} />
        <PhysicalInformation base64Img={setBase64} data={fetchedData} />
        <CustomButton label={"Update"} type="Submit" />
      </form>
    </FormProvider>
  );
};

export default Form;
