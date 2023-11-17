import React, { useEffect, useState } from "react";
import { faPencil, faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import BDRRMC from "../../../../Data/SampleData/BDRRMC.json";
import { BDRRMCTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { deleteReq, getReq, putReq } from "../../../../Service/API";

const BDRRMCList = ({ searchTerm, onEdit, onItemAddedOrUpdated, alertMsg }) => {
  const tableColumns = BDRRMCTC;
  const [bdrrmcteam, setBdrrmcteam] = useState([]);

  const restoreUser = async (id) => {
    try {
      const response = await putReq(`/api/disasterAdmin/bdrrmcteam`, {
        _id: id,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };
  const deleteBdrrmc = async (id) => {
    try {
      const response = await deleteReq(
        `/api/disasterAdmin/bdrrmcteam?_id=${id}`
      );

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Deleting Users", error);
    }
  };

  const getActionsForRow = (row) => {
    const actions = [];

    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => restoreUser(row._id),
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
        handler: () => deleteBdrrmc(row._id),
      });
    }

    return actions;
  };

  useEffect(() => {
    getBdrrmcList();
  }, [onItemAddedOrUpdated]);

  const getBdrrmcList = async () => {
    try {
      const response = await getReq("/api/disasterAdmin/bdrrmcteam");
      console.log("System User : ", response);
      setBdrrmcteam(response.teams);
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

export default BDRRMCList;
