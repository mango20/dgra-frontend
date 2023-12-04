import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";

const AddEquipment = ({
  addEquipment,
  closeModal,
  editEquipmentModal,
  selectedEquipment,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const schema = z.object({
    itemNumber: z.string().nonempty("Item Number is required"),
    category: z.string().nonempty("Category is required"),
    description: z.string().nonempty("Description is required"),
    unitCost: z.string().nonempty("Unit Cost is required"),
    propertyNumber: z.string().nonempty("Property Number is required"),
    location: z.string().nonempty("Location is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedEquipment
      ? "/api/financial/equipment"
      : "/api/financial/equipment";

    const payload = selectedEquipment
      ? { _id: selectedEquipment._id, ...data }
      : { ...data, status: "Active" };

    console.log(payload);

    try {
      const response = selectedEquipment
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

  const title = selectedEquipment ? "Edit Equipment" : "Add Equipment";

  useEffect(() => {
    if (editEquipmentModal && selectedEquipment) {
      setValue("itemNumber", selectedEquipment.itemNumber);
      setValue("category", selectedEquipment.category);
      setValue("description", selectedEquipment.description);
      setValue("unitCost", selectedEquipment.unitCost);
      setValue("propertyNumber", selectedEquipment.propertyNumber);
      setValue("location", selectedEquipment.location);
    } else {
      setValue("itemNumber", "");
      setValue("category", "");
      setValue("description", "");
      setValue("unitCost", "");
      setValue("propertyNumber", "");
      setValue("location", "");
    }
  }, [selectedEquipment, setValue]);

  return (
    <CustomModal
      show={addEquipment || editEquipmentModal}
      handleClose={closeModal}
      title={title}
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Item Number"
          className="formInputModal"
          errors={errors}
          {...register("itemNumber")}
        />
        <CustomInput
          label="Category"
          className="formInputModal"
          errors={errors}
          {...register("category")}
        />
        <CustomInput
          label="Description"
          errors={errors}
          className="formInputModal"
          {...register("description")}
        />
        <CustomInput
          label="Unit Cost"
          className="formInputModal"
          errors={errors}
          {...register("unitCost")}
        />
        <CustomInput
          label="Property Number"
          className="formInputModal"
          errors={errors}
          {...register("propertyNumber")}
        />
        <CustomInput
          label="Location"
          className="formInputModal"
          errors={errors}
          {...register("location")}
        />
      </form>
    </CustomModal>
  );
};

export default AddEquipment;
