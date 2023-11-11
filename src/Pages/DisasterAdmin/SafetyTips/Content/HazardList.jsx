import React from "react";
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

const HazardList = ({ searchTerm, onEdit }) => {
  const tableColumns = hazardTC;

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
          onEdit(row);
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

  const dataFiltered = SearchFilter(Hazard, searchTerm);

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
