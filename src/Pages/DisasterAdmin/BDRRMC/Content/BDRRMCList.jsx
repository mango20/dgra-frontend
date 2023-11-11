import React from "react";
import { faPencil, faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import BDRRMC from "../../../../Data/SampleData/BDRRMC.json";
import { BDRRMCTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";

const BDRRMCList = ({ searchTerm, onEdit }) => {
  const tableColumns = BDRRMCTC;

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

  const dataFiltered = SearchFilter(BDRRMC, searchTerm);

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
