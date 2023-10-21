import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import EventList from "./Content/EventList";
import AddEvent from "./Content/AddEvent";

const CalendarOfEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addEventModal, setAddEventModal] = useState(false);
  const handleAdd = () => {
    setAddEventModal(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setAddEventModal(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log("Search term:", searchTerm);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    console.log("View all button clicked");
  };

  return (
    <PageContainer>
      <ContentContainer title={"Calendar of Events"}>
        <AddSearch
          addLabel="Add Events"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <EventList searchTerm={searchTerm} />
      </ContentContainer>
      <AddEvent addEventModal={addEventModal} closeModal={closeModal} />
    </PageContainer>
  );
};

export default CalendarOfEvents;
