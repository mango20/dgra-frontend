import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../Components/Form/Input";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import HouseholdLocation from "./Form/HouseholdLocation";
import HouseholdCharacteristics from "./Form/HouseholdCharacteristics";

const AddHousehold = ({
  addHousehold,
  closeModal,
  editHouseholdModal,
  selectedHousehold,
}) => {
  const schema = z.object({
    province: z.string().nonempty("Province is required"),
    municipality: z.string().nonempty("Municipality is required"),
  });

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm({ resolver: zodResolver(schema) });

  const methods = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    if (selectedHousehold) {
      // Logic to update the existing event
      console.log("Edit event data:", data);
    } else {
      // Logic to add a new event
      console.log("Add event data:", data);
    }

    closeModal();
  };

  return (
    <CustomModal
      size="lg"
      show={addHousehold || editHouseholdModal}
      handleClose={closeModal}
      title={selectedHousehold ? "Edit Household" : "Add Household"}
      handleAction={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <form>
          <HouseholdLocation selectedHousehold={selectedHousehold} />
          <HouseholdCharacteristics selectedHousehold={selectedHousehold} />
        </form>
      </FormProvider>
      {/* <form> */}
      {/* <CustomInput
          label="Type"
          className="formInputModal"
          errors={errors}
          {...register("type")}
        />
        <CustomInput
          label="Name"
          className="formInputModal"
          errors={errors}
          {...register("name")}
        />
        <CustomInput
          label="When"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("when")}
        />
        <CustomInput
          label="Where"
          className="formInputModal"
          errors={errors}
          {...register("where")}
        /> */}
      {/* </form> */}
    </CustomModal>
  );
};

export default AddHousehold;
