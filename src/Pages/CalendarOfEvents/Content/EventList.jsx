import React from "react";
import CustomTable from "../../../Components/UI/Table/Table";
import Events from "../../../Data/SampleData/Events.json";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchFilter from "../../../Utils/SearchFilter";
import { eventTC } from "../../../Utils/TableColumns";
const EventList = ({ searchTerm }) => {
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

export default EventList;