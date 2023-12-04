import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import HouseholdList from "./Content/HouseholdList";
import AddHousehold from "./Content/AddHousehold";
import CustomAlert from "../../../Components/UI/Alert/Alert";

const Household = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addHousehold, setAddHousehold] = useState(false);
  const [editHouseholdModal, setEditHouseholdModal] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setAddHousehold(true);
    setSelectedHousehold(null);
  };

  const handleEdit = (event) => {
    setSelectedHousehold(event);
    setEditHouseholdModal(true);
    setAddHousehold(true);
  };

  const closeModal = () => {
    setAddHousehold(false);
    setEditHouseholdModal(false);
    setSelectedHousehold(null);
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
      <ContentContainer title={"Household"}>
        <AddSearch
          addLabel="Add Household"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        {alertLabel && <CustomAlert label={alertLabel} />}
        <HouseholdList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>
      <AddHousehold
        addHousehold={addHousehold}
        closeModal={closeModal}
        editHouseholdModal={editHouseholdModal}
        selectedHousehold={selectedHousehold}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default Household;
