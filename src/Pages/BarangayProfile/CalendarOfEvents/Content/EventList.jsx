import React, { useEffect, useState } from "react";
import { faPencil, faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { eventTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { getReq, patchReq } from "../../../../Service/API";

const EventList = ({ searchTerm, onEdit, onEventAddedOrUpdated, eventMsg }) => {
  const tableColumns = eventTC;
  const [events, setEvents] = useState([]);

  const restoreEvent = async (eventId) => {
    try {
      const response = await patchReq(
        "/api/barangayprofile/calendarofevents/update",
        {
          _id: eventId,
          status: "Active",
        }
      );

      console.log(response);
      onEventAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring Event", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await patchReq("/api/barangayprofile/calendarofevents", {
        _id: eventId,
        status: "Deleted",
      });

      console.log(response);
      eventMsg(response.message);
      onEventAddedOrUpdated();
    } catch (error) {
      console.log("Error Deleting Event", error);
    }
  };

  const getActionsForRow = (row) => {
    if (row.status === "Deleted") {
      return [
        {
          label: "Restore",
          icon: faRotate,
          handler: () => restoreEvent(row._id),
        },
      ];
    }

    return [
      {
        label: "Edit",
        icon: faPencil,
        handler: () => onEdit(row),
      },
      {
        label: "Delete",
        icon: faTrash,
        handler: () => deleteEvent(row._id),
      },
    ];
  };

  useEffect(() => {
    getEvent();
  }, [onEventAddedOrUpdated]);

  const getEvent = async () => {
    try {
      const response = await getReq("/api/barangayprofile/calendarofevents");
      console.log("System User: ", response);
      setEvents(response.calendarOfEvents);
    } catch (error) {
      console.log("Error Getting Events", error);
    }
  };

  const dataFiltered = SearchFilter(events, searchTerm);

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
