import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import hazard from "../../../../Data/hazard.json";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomTextArea from "../../../../Components/Form/TextArea";
import Select from "../../../../Components/Form/Select";
import { patchReq, postReq } from "../../../../Service/API";
import { useSelector } from "react-redux";
import { generateFullName } from "../../../../Utils/Fullname";

const AddHazard = ({
  addHazard,
  closeModal,
  editHazardModal,
  selectedHazard,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const currentUser = useSelector((state) => state.reducer.userInfo?.userInfo);

  const schema = z.object({
    hazard: z.string().nonempty("Hazard is required"),
    description: z.string().nonempty("Description is required"),
    facts: z.string().nonempty("Facts is required"),
    safetyTips: z.string().nonempty("Safety tips is required"),
    before: z.string().nonempty("Before is required"),
    during: z.string().nonempty("During is required"),
    after: z.string().nonempty("After is required"),
  });

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedHazard
      ? "/api/disasterAdmin/safetytips"
      : "/api/disasterAdmin/safetytips";

    const fullname = generateFullName(currentUser);

    const whatToDo = {
      before: data.before,
      during: data.during,
      after: data.after,
    };

    const payload = selectedHazard
      ? { ...data, whatToDo, _id: selectedHazard._id }
      : {
          ...data,
          whatToDo,
          assignedChairman: fullname,
        };

    console.log(payload);

    try {
      const response = selectedHazard
        ? await patchReq(endpoint, payload)
        : await postReq(endpoint, payload);

      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.error("Error Adding User", error);
    }

    reset();
    closeModal();
  };

  useEffect(() => {
    if (editHazardModal && selectedHazard) {
      console.log("fdsfsdf");
      setValue("hazard", selectedHazard.hazard);
      setValue("description", selectedHazard.description);
      setValue("facts", selectedHazard.facts);
      setValue("safetyTips", selectedHazard.safetyTips);
      setValue("before", selectedHazard.whatToDo.before);
      setValue("during", selectedHazard.whatToDo.during);
      setValue("after", selectedHazard.whatToDo.after);
    } else {
      console.log("first");
      setValue("hazard", "");
      setValue("description", "");
      setValue("facts", "");
      setValue("safetyTips", "");
      setValue("before", "");
      setValue("during", "");
      setValue("after", "");
    }
  }, [selectedHazard, setValue]);

  return (
    <CustomModal
      show={addHazard || editHazardModal}
      handleClose={closeModal}
      title={selectedHazard ? "Edit Hazard" : "Add Hazard"}
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <Select
          data={hazard}
          label="Hazard"
          className="formSelectModal"
          defaultOptionLabel="Select Hazard"
          errors={errors}
          {...register("hazard")}
        />
        <CustomTextArea
          label="Description"
          className="formTextareaModal"
          errors={errors}
          {...register("description")}
        />
        <CustomTextArea
          label="Facts"
          className="formTextareaModal"
          errors={errors}
          {...register("facts")}
        />
        <CustomTextArea
          label="Safety Tips"
          className="formTextareaModal"
          errors={errors}
          {...register("safetyTips")}
        />
        <label
          style={{ fontFamily: "$lato", fontSize: "20px", fontWeight: "bold" }}
        >
          What To Do
        </label>
        <CustomTextArea
          label="Before"
          className="formTextareaModal"
          errors={errors}
          {...register("before")}
        />
        <CustomTextArea
          label="During"
          className="formTextareaModal"
          errors={errors}
          {...register("during")}
        />
        <CustomTextArea
          label="After"
          className="formTextareaModal"
          errors={errors}
          {...register("after")}
        />
      </form>
    </CustomModal>
  );
};

export default AddHazard;
