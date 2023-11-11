import React from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Evacuation from "../../../../Data/SampleData/Evacuation.json";
import CustomTable from "../../../../Components/UI/Table/Table";
import SearchFilter from "../../../../Utils/SearchFilter";
import { evacuationTC } from "../../../../Utils/TableColumns";

const EvacuationList = ({ searchTerm }) => {
  const tableColumns = evacuationTC;

  const getActionsForRow = (row) => {
    const actions = [];
    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => {
          // Your restore logic goes here
        },
      });
    } else {
      actions.push({
        label: "Edit",
        icon: faPencil,
        handler: () => {
          // Implement your edit logic here
        },
      });

      actions.push({
        label: "Delete",
        icon: faTrash,
        handler: () => {
          console.log("Deleted");
        },
      });
    }

    return actions;
  };

  const dataFiltered = SearchFilter(Evacuation, searchTerm);

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

export default EvacuationList;
