import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../Components/Form/Input";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../Components/Form/Select";
import Checkbox from "../../../../Components/Form/Checkbox";
import Message from "../../../../Components/UI/Message/Message";

// Pending Modal
const AddEvacuation = ({ addEvacuation, closeModal }) => {
  const schema = z.object({
    type: z.string().nonempty("Type is required"),
    name: z.string().nonempty("Name is required"),
    when: z.string().refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid Date" }
    ),
    where: z.string().nonempty("Location is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    closeModal();
  };

  const facilitiesOption = [
    { label: "Toilet", value: "toilet" },
    { label: "Access to Water", value: "accessWater" },
    { label: "With Electricity", value: "withElectricity" },
    { label: "Working Generator", value: "workingGenerator" },
    { label: "With Private Rooms", value: "withPrivateRooms" },
    { label: "With Lactating Room", value: "withLactatingRoom" },
    { label: "Kitchen", value: "kitchen" },
  ];

  const applicableCenterOption = [
    { label: "Typhoon", value: "agricultural" },
    { label: "Flood", value: "flood" },
    { label: "Storm Surge", value: "stormSurge" },
    { label: "Landslide / Mudslide", value: "landslideMudslide" },
    { label: "Drought", value: "drought" },
    { label: "Volcanic Eruption", value: "volcanicEruption" },
    { label: "Sinkhole", value: "sinkhole" },
  ];
  return (
    <CustomModal
      show={addEvacuation}
      handleClose={closeModal}
      title="Add Evacuation"
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Purok"
          className="formInputModal"
          errors={errors}
          {...register("purok")}
        />
        <CustomInput
          label="Barangay"
          className="formInputModal"
          errors={errors}
          {...register("barangay")}
        />
        <CustomInput
          label="Street"
          className="formInputModal"
          errors={errors}
          {...register("street")}
        />
        <CustomInput
          label="Municipality"
          className="formInputModal"
          errors={errors}
          {...register("municipality")}
        />
        <CustomInput
          label="Province"
          className="formInputModal"
          errors={errors}
          {...register("province")}
        />
        <CustomInput
          label="Evacuation Center Name"
          className="formInputModal"
          errors={errors}
          {...register("evacuationCenterName")}
        />
        <CustomInput
          label="Capacity"
          className="formInputModal"
          errors={errors}
          {...register("capacity")}
        />
        <Select
          label="Type"
          errors={errors}
          defaultOptionLabel="Select Evacuation Center Type"
          // data={landClassification}
          {...register("type")}
          className="formSelectModal"
        />
        <Select
          label="Condition"
          errors={errors}
          defaultOptionLabel="Select Evacuation Center Condition"
          // data={landClassification}
          {...register("type")}
          className="formSelectModal"
        />
        <CustomInput
          label="Person in-charge"
          className="formInputModal"
          errors={errors}
          {...register("personInCharge")}
        />{" "}
        <CustomInput
          label="Contact"
          className="formInputModal"
          errors={errors}
          {...register("contact")}
        />
        <div className="checkboxGroups">
          <label>Facilities (Check if Applicable)</label>
          <div className="checkboxGroupsInner">
            {facilitiesOption.map((option) => (
              <div key={option.value}>
                <Checkbox
                  label={option.label}
                  {...register("facilities")}
                  value={option.value}
                />
              </div>
            ))}
            <div className="errCheckDiv">
              {errors && errors.facilities && (
                <Message label="Facilities is required" className={"error"} />
              )}
            </div>
          </div>
        </div>
        <div className="checkboxGroups">
          <label>Applicable Center (Check if Applicable)</label>
          <div className="checkboxGroupsInner">
            {applicableCenterOption.map((option) => (
              <div key={option.value}>
                <Checkbox
                  label={option.label}
                  {...register("applicableCenter")}
                  value={option.value}
                />
              </div>
            ))}
            <div className="errCheckDiv">
              {errors && errors.applicableCenter && (
                <Message
                  label="Applicable Center is required"
                  className={"error"}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddEvacuation;
