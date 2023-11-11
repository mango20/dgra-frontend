import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import AdvisoryList from "./Content/AdvisoryList";
import AddAdvisory from "./Content/AddAdvisory";

const Advisory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addAdvisory, setAddAdvisory] = useState(false);
  const [editAdvisoryModal, setEditAdvisoryModal] = useState(false);
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);

  const handleAdd = () => {
    setAddAdvisory(true);
    setSelectedAdvisory(null);
  };

  const handleEdit = (event) => {
    setSelectedAdvisory(event);
    setEditAdvisoryModal(true);
    setAddAdvisory(true);
  };

  const closeModal = () => {
    setAddAdvisory(false);
    setEditAdvisoryModal(false);
    setSelectedAdvisory(null);
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
        <AdvisoryList searchTerm={searchTerm} onEdit={handleEdit} />
      </ContentContainer>
      <AddAdvisory
        addAdvisory={addAdvisory}
        closeModal={closeModal}
        editAdvisoryModal={editAdvisoryModal}
        selectedAdvisory={selectedAdvisory}
      />
    </PageContainer>
  );
};

export default Advisory;
