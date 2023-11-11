import React from "react";
import SearchFilter from "../../../../Utils/SearchFilter";
import Events from "../../../../Data/SampleData/Events.json";
import {
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { eventTC } from "../../../../Utils/TableColumns";
import CustomTable from "../../../../Components/UI/Table/Table";
const TeamMemberList = ({ searchTerm, onEdit }) => {
  const tableColumns = eventTC;

  const getActionsForRow = (row) => {
    const actions = [];
    // if (row.age > 25) {
    //   actions.push({
    //     label: "Edit",
    //     handler: () => {
    //       // Implement your edit logic here
    //     },
    //   });
    // }

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

  const dataFiltered = SearchFilter(Events, searchTerm);

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
