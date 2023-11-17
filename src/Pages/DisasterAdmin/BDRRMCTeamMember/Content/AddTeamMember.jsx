import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../../Components/UI/Modal/CustomModal";
import CustomInput from "../../../../Components/Form/Input";
import Select from "../../../../Components/Form/Select";
import { getReq, patchReq, postReq } from "../../../../Service/API";
import genderOption from "../../../../Data/gender.json";
const AddTeamMember = ({
  addTeamMemberModal,
  closeModal,
  editTeamMemberModal,
  selectedTeamMember,
  alertMsg,
  onItemAddedOrUpdated,
}) => {
  const [team, setTeams] = useState([]);
  const [teamObject, setTeamObject] = useState(null);
  const schema = z.object({
    firstName: z.string().nonempty("First Name is required"),
    middleName: z.string(),
    lastName: z.string().nonempty("Last Name is required"),
    gender: z.string().nonempty("Gender is required"),
    birthdate: z.string().refine(
      (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      },
      { message: "Invalid Date" }
    ),
    team: z.string().nonempty("Team is required"),
    from: z.string(), // Assuming you want to validate the date format
    to: z.string(), // Assuming you want to validate the date format
    contactNumber: z.string(), // You might want to add more specific validation for the contactNumber field
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const handleTeamSelection = (selectedTeamName) => {
    const selectedTeam = teamObject.find(
      (team) => team.name === selectedTeamName
    );
    setTeamObject(selectedTeam);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const endpoint = selectedTeamMember
      ? "/api/disasterAdmin/bdrrmcteammember"
      : "/api/disasterAdmin/bdrrmcteammember";

    const payload = selectedTeamMember
      ? { _id: selectedTeamMember?._id, ...data }
      : { ...data, period: { from: data.from, to: data.to }, team: teamObject };

    console.log(payload);

    try {
      const response = selectedTeamMember
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
    if (editTeamMemberModal && selectedTeamMember) {
      // If editing an event, set form values using setValue
      setValue("firstName", selectedTeamMember.firstName);
      setValue("middleName", selectedTeamMember.middleName);
      setValue("lastName", selectedTeamMember.lastName); // Make sure it's in the correct format
      setValue("gender", selectedTeamMember.gender);
      setValue("birthdate", selectedTeamMember.birthdate);
      setValue("team", selectedTeamMember.team.name);
      setValue("to", selectedTeamMember.period.to);
      setValue("from", selectedTeamMember.period.from);
      setValue("contactNumber", selectedTeamMember.contactNumber);
    } else {
      setValue("firstName", "");
      setValue("middleName", "");
      setValue("lastName", ""); // Make sure it's in the correct format
      setValue("gender", "");
      setValue("birthdate", "");
      setValue("team", "");
      setValue("to", "");
      setValue("from", "");
      setValue("contactNumber", "");
    }
  }, [selectedTeamMember, setValue]);

  useEffect(() => {
    getBDRRMCTeam();
  }, []);

  const getBDRRMCTeam = async () => {
    try {
      const response = await getReq("/api/disasteradmin/bdrrmcteamnames");
      console.log(response.teams);
      setTeamObject(response.teams); // store in payload if one of the array selected
      const teamNames = response.teams.map((team) => team.name);
      console.log(teamNames);
      setTeams(teamNames);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  console.log(team);
  return (
    <CustomModal
      show={addTeamMemberModal || editTeamMemberModal}
      handleClose={closeModal}
      title={
        selectedTeamMember
          ? "Edit BDRRMC Team Member"
          : "Add BDRRMC Team Member"
      }
      handleAction={handleSubmit(onSubmit)}
    >
      <form>
        <CustomInput
          label="First Name"
          className="formInputModal"
          errors={errors}
          {...register("firstName")}
        />{" "}
        <CustomInput
          label="Middle Name"
          className="formInputModal"
          errors={errors}
          {...register("middleName")}
        />{" "}
        <CustomInput
          label="Last Name"
          className="formInputModal"
          errors={errors}
          {...register("lastName")}
        />
        <Select
          label="Gender"
          errors={errors}
          defaultOptionLabel="Select Gender"
          data={genderOption}
          {...register("gender")}
          className="formSelectModal"
        />
        <CustomInput
          label="Birthdate"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("birthdate")}
        />
        <Select
          label="Team"
          errors={errors}
          defaultOptionLabel="Select Team"
          data={team}
          {...register("team")}
          className="formSelectModal"
          onChange={(e) => handleTeamSelection(e.target.value)}
        />
        <CustomInput
          label="Period From"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("from")}
        />
        <CustomInput
          label="Period To"
          className="formInputModal"
          type="date"
          errors={errors}
          {...register("to")}
        />
        <CustomInput
          label="Contact"
          className="formInputModal"
          errors={errors}
          {...register("contactNumber")}
        />
      </form>
    </CustomModal>
  );
};

export default AddTeamMember;
