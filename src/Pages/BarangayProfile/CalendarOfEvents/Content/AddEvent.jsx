import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import { patchReq, postReq } from "../../../../Service/API";
import { useSelector } from "react-redux";
import { generateFullName } from "../../../../Utils/Fullname";

const AddEvent = ({
  addEventModal,
  closeModal,
  editEventModal,
  selectedEvent,
  eventMsg,
  onEventAddedOrUpdated,
}) => {
  const currentUser = useSelector((state) => state.reducer.userInfo?.userInfo);

  const schema = z.object({
    eventType: z.string().nonempty("Type is required"),
    eventName: z.string().nonempty("Name is required"),
    eventDate: z
      .string()
      .refine((dateString) => !isNaN(new Date(dateString).getTime()), {
        message: "Invalid Date",
      }),
    eventLocation: z.string().nonempty("Location is required"),
  });

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const endpoint = selectedEvent
      ? "/api/barangayprofile/calendarofevents/update"
      : "/api/barangayprofile/calendarofevents";

    const fullname = generateFullName(currentUser);
    const payload = selectedEvent
      ? { _id: selectedEvent._id, ...data }
      : { assignedUser: fullname, ...data };

    console.log(payload);
    console.log({ assignedUser: fullname, ...data });
    try {
      const response = selectedEvent
        ? await patchReq(endpoint, payload)
        : await postReq(endpoint, payload);

      eventMsg(response.message);
      onEventAddedOrUpdated();
    } catch (error) {
      console.error("Error Posting Event", error);
    }

    closeModal();
  };

  useEffect(() => {
    if (editEventModal && selectedEvent) {
      const { eventType, eventName, eventDate, eventLocation } = selectedEvent;
      setValue("eventType", eventType);
      setValue("eventName", eventName);
      setValue("eventDate", eventDate);
      setValue("eventLocation", eventLocation);
    } else {
      setValue("eventType", "");
      setValue("eventName", "");
      setValue("eventDate", "");
      setValue("eventLocation", "");
    }
  }, [editEventModal, selectedEvent, setValue]);

  const title = selectedEvent ? "Edit Event" : "Add Event";

  return (
    <CustomModal
      show={addEventModal || editEventModal}
      handleClose={closeModal}
      title={title}
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
