import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import landClassification from "../../../../Data/landClassification.json";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import Select from "../../../../Components/Form/Select";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";
const AddSupply = ({
  addSupply,
  closeModal,
  editSupplyModal,
  selectedSupply,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const schema = z.object({
    itemNumber: z.string().nonempty("Item Number is required"),
    category: z.string().nonempty("Category is required"),
    description: z.string().nonempty("Description is required"),
    unitCost: z.string().nonempty("Unit Cost is required"),
    quantity: z.string().nonempty("Quantity is required"),
    totalCost: z.string().nonempty("Total Cost is required"),
    stockOut: z.string().nonempty("Stock Out is required"),
    stockIn: z.string().nonempty("Stock In is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedSupply
      ? "/api/financial/supplies"
      : "/api/financial/supplies";

    // const fullname = generateFullName(currentUser);

    const payload = selectedSupply
      ? { _id: selectedSupply._id, ...data }
      : { ...data };

    console.log(payload);

    try {
      const response = selectedSupply
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

  const title = selectedSupply ? "Edit Supply" : "Add Supply";

  useEffect(() => {
    console.log(editSupplyModal && selectedSupply);
    if (editSupplyModal && selectedSupply) {
      setValue("itemNumber", selectedSupply.itemNumber);
      setValue("category", selectedSupply.category);
      setValue("description", selectedSupply.description);
      setValue("unitCost", selectedSupply.unitCost);
      setValue("quantity", selectedSupply.quantity);
      setValue("totalCost", selectedSupply.totalCost);
      setValue("stockOut", selectedSupply.stockOut);
      setValue("stockIn", selectedSupply.stockIn);
    } else {
      setValue("itemNumber", "");
      setValue("category", "");
      setValue("description ", "");
      setValue("unitCost ", "");
      setValue("quantity ", "");
      setValue("totalCost ", "");
      setValue("stockOut ", "");
      setValue("stockIn ", "");
    }
  }, [selectedSupply, setValue]);

  return (
    <CustomModal
      show={addSupply || editSupplyModal}
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
          label="Quatity"
          className="formInputModal"
          errors={errors}
          {...register("quantity")}
        />
        <CustomInput
          label="Total Cost"
          className="formInputModal"
          errors={errors}
          {...register("totalCost")}
        />
        <CustomInput
          label="Stock Out"
          className="formInputModal"
          errors={errors}
          {...register("stockOut")}
        />
        <CustomInput
          label="Stock In"
          className="formInputModal"
          errors={errors}
          {...register("stockIn")}
        />
      </form>
    </CustomModal>
  );
};

export default AddSupply;
