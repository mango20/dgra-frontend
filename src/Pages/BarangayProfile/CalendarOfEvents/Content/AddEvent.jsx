import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";

const AddEvent = ({
  addEventModal,
  closeModal,
  editEventModal,
  selectedEvent,
  eventMsg,
  onEventAddedOrUpdated,
}) => {
  const schema = z.object({
    eventType: z.string().nonempty("Type is required"),
    eventName: z.string().nonempty("Name is required"),
    eventDate: z.string().refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid Date" }
    ),
    eventLocation: z.string().nonempty("Location is required"),
  });

  // console.log(defaultValues);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    if (selectedEvent) {
      const payload = {
        _id: selectedEvent._id,
        ...data,
      };

      console.log(payload);
      try {
        const response = await patchReq(
          "/api/barangayprofile/calendarofevents/update",
          payload
        );
        console.log(response);
        eventMsg(response.message);
        onEventAddedOrUpdated();
      } catch (error) {
        console.log("Error Post Even", error);
      }
    } else {
      try {
        const response = await postReq(
          "/api/barangayprofile/calendarofevents",
          data
        );
        console.log(response);
        eventMsg(response.message);
        onEventAddedOrUpdated();
      } catch (error) {
        console.log("Error Post Even", error);
      }

      console.log("Add event data:", data);
    }
    closeModal();
  };

  useEffect(() => {
    if (editEventModal && selectedEvent) {
      setValue("eventType", selectedEvent.eventType);
      setValue("eventName", selectedEvent.eventName);
      setValue("eventDate", selectedEvent.eventDate);
      setValue("eventLocation", selectedEvent.eventLocation);
    } else {
      setValue("eventType", "");
      setValue("eventName", "");
      setValue("eventDate", "");
      setValue("eventLocation", "");
    }
  }, [editEventModal, selectedEvent, setValue]);

  return (
    <CustomModal
      show={addEventModal || editEventModal}
      handleClose={closeModal}
      title={selectedEvent ? "Edit Event" : "Add Event"}
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="Type"
          className="formInputModal"
          errors={errors}
          {...register("eventType")}
        />
        <CustomInput
          label="Name"
          className="formInputModal"
          errors={errors}
          {...register("eventName")}
        />
        <CustomInput
          label="When"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("eventDate")}
        />
        <CustomInput
          label="Where"
          className="formInputModal"
          errors={errors}
          {...register("eventLocation")}
        />
      </form>
    </CustomModal>
  );
};

export default AddEvent;
