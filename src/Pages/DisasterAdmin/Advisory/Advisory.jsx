import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import AdvisoryList from "./Content/AdvisoryList";
import AddAdvisory from "./Content/AddAdvisory";

const Advisory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addAdvisory, setAddAdvisory] = useState(false);

  const handleAdd = () => {
    setAddAdvisory(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setAddAdvisory(false);
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
      <ContentContainer title={"Advisory"}>
        <AddSearch
          addLabel="Add Advisory Message"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <AdvisoryList searchTerm={searchTerm} />
      </ContentContainer>
      <AddAdvisory addAdvisory={addAdvisory} closeModal={closeModal} />
    </PageContainer>
  );
};

export default Advisory;
