import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import AddBDRRMC from "./Content/AddBDRRMC";
import BDRRMCList from "./Content/BDRRMCList";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const BDRRMC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addBDRRMC, setAddBDRRMC] = useState(false);
  const [editBDRRMCModal, setEditBDRRMCModal] = useState(false);
  const [selectedBDRRMC, setSelectedBDRRMC] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setAddBDRRMC(true);
    setSelectedBDRRMC(null); // Clear any previously selected event for editing
  };

  const handleEdit = (event) => {
    setSelectedBDRRMC(event);
    setEditBDRRMCModal(true);
    setAddBDRRMC(true);
  };

  const closeModal = () => {
    setAddBDRRMC(false);
    setEditBDRRMCModal(false);
    setSelectedBDRRMC(null);
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log("Search term:", searchTerm);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    console.log("View all button clicked");
  };

  useEffect(() => {
    if (alertLabel) {
      const timer = setTimeout(() => {
        setAlertLabel("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertLabel]);

  return (
    <PageContainer>
      <ContentContainer title={"BDRRMC Team"}>
        <AddSearch
          addLabel="Add BDRRMC Team"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        {alertLabel && <CustomAlert label={alertLabel} />}
        <BDRRMCList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddBDRRMC
        addBDRRMC={addBDRRMC}
        closeModal={closeModal}
        editBDRRMCModal={editBDRRMCModal}
        selectedBDRRMC={selectedBDRRMC}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default BDRRMC;
