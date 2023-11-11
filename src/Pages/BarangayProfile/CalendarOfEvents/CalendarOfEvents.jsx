import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import EventList from "./Content/EventList";
import AddEvent from "./Content/AddEvent";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const CalendarOfEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventLabel, setEventLabel] = useState("");

  const handleAdd = () => {
    setAddEventModal(true);
    setSelectedEvent(null); // Clear any previously selected event for editing
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditEventModal(true);
    setAddEventModal(true);
  };

  const closeModal = () => {
    setAddEventModal(false);
    setEditEventModal(false);
    setSelectedEvent(null);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    console.log("View all button clicked");
  };

  useEffect(() => {
    if (eventLabel) {
      const timer = setTimeout(() => {
        setEventLabel("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [eventLabel]);

  return (
    <PageContainer>
      <ContentContainer title={"Calendar of Events"}>
        <AddSearch
          addLabel="Add Events"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        {eventLabel && <CustomAlert label={eventLabel} />}
        <EventList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onEventAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddEvent
        addEventModal={addEventModal}
        closeModal={closeModal}
        editEventModal={editEventModal}
        selectedEvent={selectedEvent}
        eventMsg={(label) => setEventLabel(label)}
        onEventAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default CalendarOfEvents;
