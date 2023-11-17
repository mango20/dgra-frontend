import React, { useEffect, useState } from "react";
import {
  faPaperPlane,
  faPencil,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Hazard from "../../../../Data/SampleData/Hazard.json";
import { hazardTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { deleteReq, getReq, patchReq, putReq } from "../../../../Service/API";

const HazardList = ({ searchTerm, onEdit, onItemAddedOrUpdated, alertMsg }) => {
  const tableColumns = hazardTC;
  const [hazard, setHazard] = useState([]);

  const restoreHazard = async (id) => {
    try {
      const response = await putReq(`/api/disasterAdmin/safetytips?_id=${id}`, {
        _id: id,
      });

      console.log(id);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  const deleteHazard = async (id) => {
    try {
      const response = await deleteReq(
        `/api/disasterAdmin/safetytips?_id=${id}`
      );

      console.log(id);
      alertMsg(response.message);
      onItemAddedOrUpdated();
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
        handler: () => restoreHazard(row._id),
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
        handler: () => deleteHazard(row._id),
      });
    }

    return actions;
  };

  useEffect(() => {
    getHazard();
  }, [onItemAddedOrUpdated]);

  const getHazard = async () => {
    try {
      const response = await getReq("/api/disasterAdmin/safetytips");
      console.log("System User : ", response);

      setHazard(response.hazardInformations);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(hazard, searchTerm);

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

export default HazardList;
