import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import EvacuationList from "./Content/EvacuationList";
import AddEvacuation from "./Content/AddEvacuation";

const Evacuation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addEvacuation, setEvacuation] = useState(false);

  const handleAdd = () => {
    setEvacuation(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setEvacuation(false);
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
      <ContentContainer title={"Evacuation Center"}>
        <AddSearch
          addLabel="Evacuation Center"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <EvacuationList searchTerm={searchTerm} />
      </ContentContainer>
      <AddEvacuation addEvacuation={addEvacuation} closeModal={closeModal} />
    </PageContainer>
  );
};

export default Evacuation;
