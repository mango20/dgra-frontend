import React from "react";

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

const AdvisoryList = ({ searchTerm, onEdit }) => {
  const tableColumns = advisoryTC;

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
          console.log("Deleted");
        },
      });
    }

    return actions;
  };

  const dataFiltered = SearchFilter(Advisory, searchTerm);

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
