import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import HazardList from "./Content/HazardList";
import AddHazard from "./Content/AddHazard";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const SafetyTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addHazard, setAddHazard] = useState(false);
  const [editHazardModal, setEditHazardModal] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setAddHazard(true);
    setSelectedHazard(null); // Clear any previously selected event for editing
  };

  const handleEdit = (event) => {
    setSelectedHazard(event);
    setEditHazardModal(true);
    setAddHazard(true);
  };

  const closeModal = () => {
    setAddHazard(false);
    setEditHazardModal(false);
    setSelectedHazard(null);
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
      <ContentContainer title={"Safety Tips"}>
        <AddSearch
          addLabel="Add Hazard"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />{" "}
        {alertLabel && <CustomAlert label={alertLabel} />}
        <HazardList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddHazard
        addHazard={addHazard}
        closeModal={closeModal}
        editHazardModal={editHazardModal}
        selectedHazard={selectedHazard}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default SafetyTips;
