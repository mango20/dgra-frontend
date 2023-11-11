import React, { useEffect, useState } from "react";
import Events from "../../../../Data/SampleData/Events.json";
import {
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { eventTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { getReq } from "../../../../Service/API";

const EventList = ({ searchTerm, onEdit, onEventAddedOrUpdated }) => {
  const tableColumns = eventTC;
  const [event, setEvent] = useState([]);

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

  useEffect(() => {
    getEvent();
  }, [onEventAddedOrUpdated]);

  const getEvent = async () => {
    try {
      const response = await getReq("/api/barangayprofile/calendarofevents");
      console.log("System User : ", response);
      setEvent(response.calendarOfEvents);
      // dispatch(userListGetSuccess(response.systemUser));
      // setUser(response.systemUser);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(event, searchTerm);

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
