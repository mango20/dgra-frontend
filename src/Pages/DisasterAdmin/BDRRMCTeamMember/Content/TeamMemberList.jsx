import React, { useEffect, useState } from "react";
import SearchFilter from "../../../../Utils/SearchFilter";
import Events from "../../../../Data/SampleData/Events.json";
import {
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { BDRRMCTeamMember } from "../../../../Utils/TableColumns";
import CustomTable from "../../../../Components/UI/Table/Table";
import { deleteReq, getReq, putReq } from "../../../../Service/API";
const TeamMemberList = ({
  searchTerm,
  onEdit,
  onItemAddedOrUpdated,
  alertMsg,
}) => {
  const tableColumns = BDRRMCTeamMember;
  const [bdrrmcteam, setBdrrmcteam] = useState([]);

  const restoreBDRRMCTeamMember = async (id) => {
    try {
      const response = await putReq("/api/disasterAdmin/bdrrmcteammember", {
        _id: id,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  const deleteBdrrmcTeamMember = async (id) => {
    try {
      const response = await deleteReq(
        `/api/disasterAdmin/bdrrmcteammember?_id=${id}`
      );

      console.log(response);
      // alertMsg(response.message);
      getBDRRMCTeam();
    } catch (error) {
      console.log("Error Deleting User", error);
    }
  };

  const getActionsForRow = (row) => {
    const actions = [];

    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => restoreBDRRMCTeamMember(row._id),
      });
    } else {
      actions.push({
        label: "Edit",
        icon: faPencil,
        handler: () => {
          onEdit(row);
        },
      });

      actions.push({
        label: "Delete",
        icon: faTrash,
        handler: () => deleteBdrrmcTeamMember(row._id),
      });
    }

    return actions;
  };

  useEffect(() => {
    getBDRRMCTeam();
  }, [onItemAddedOrUpdated]);

  const getBDRRMCTeam = async () => {
    try {
      const response = await getReq("/api/disasterAdmin/bdrrmcteammember");
      console.log("BDRRMC User : ", response);
      setBdrrmcteam(response.teamMembers);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(bdrrmcteam, searchTerm);

  return (
    <div>
      <CustomTable
        data={dataFiltered}
        columns={tableColumns}
        getActions={getActionsForRow}
        itemsPerPage={5}
      />
    </div>
  );
};

export default TeamMemberList;
