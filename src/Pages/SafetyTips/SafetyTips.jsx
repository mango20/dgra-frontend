import React, { useState } from "react";
import AddHazard from "./Content/AddHazard";
import ContentContainer from "../../Layout/Container/ContentContainer";
import AddSearch from "../../Components/UI/AddSearch/AddSearch";
import HazardList from "./Content/HazardList";

const SafetyTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addHazard, setAddHazard] = useState(false);

  const handleAdd = () => {
    setAddHazard(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setAddHazard(false);
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
    <div>
      <ContentContainer title={"Safety Tips"}>
        <AddSearch
          addLabel="Add Hazard"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <HazardList searchTerm={searchTerm} />
      </ContentContainer>
      <AddHazard addHazard={addHazard} closeModal={closeModal} />
    </div>
  );
};

export default SafetyTips;
