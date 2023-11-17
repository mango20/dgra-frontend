import React, { useEffect, useState } from "react";

import Advisory from "../../../../Data/SampleData/Advisory.json";
import {
  faPlus,
  faEye,
  faPencil,
  faTrash,
  faPlane,
  faPaperPlane,
  faRotate,
} from "@fortawesome/free-solid-svg-icons"; // Import the FontAwesome icons you're using
import { advisoryTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { deleteReq, getReq, patchReq } from "../../../../Service/API";
import { useDispatch } from "react-redux";

const AdvisoryList = ({
  searchTerm,
  onEdit,
  onItemAddedOrUpdated,
  alertMsg,
}) => {
  const tableColumns = advisoryTC;
  // const dispatch = useDispatch();
  const [advisoryList, setAdvisoryList] = useState([]);

  const restoreAdvisory = async (id) => {
    try {
      const response = await patchReq("/api/system-tools/systemTools/restore", {
        _id: id,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  // Pending
  const deleteAdvisory = async (id) => {
    try {
      const response = await deleteReq("/api/disasterAdmin/disasteradvisory", {
        _id: id,
      });

      console.log(response);
      alertMsg(response.message);
      getAdvisoryList();
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
        handler: () => {
          restoreAdvisory(row._id);
        },
      });
    } else {
      actions.push({
        label: "Send",
        icon: faPaperPlane,
        handler: () => {
          // Implement your edit logic here
        },
      });

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
        handler: () => {
          deleteAdvisory(row._id);
        },
      });
    }

    return actions;
  };

  useEffect(() => {
    getAdvisoryList();
  }, [onItemAddedOrUpdated]);

  const getAdvisoryList = async () => {
    try {
      const response = await getReq("/api/disasterAdmin/disasteradvisory");
      console.log("Advisory List : ", response.disasterAdvisories);
      setAdvisoryList(response.disasterAdvisories);
    } catch (error) {
      console.log("Error Advisory list", error);
    }
  };
  const dataFiltered = SearchFilter(advisoryList, searchTerm);

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

export default AdvisoryList;
