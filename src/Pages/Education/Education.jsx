import React, { useEffect, useState } from "react";
import ContentContainer from "../../Layout/Container/ContentContainer";
import AddSearch from "../../Components/UI/AddSearch/AddSearch";
import AddEducation from "./Content/AddEducation";
import EducationList from "./Content/EducationList";
import PageContainer from "../../Layout/Container/PageContainer";
import CustomAlert from "../../Components/UI/Alert/Alert";

const Education = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addEducation, setEducation] = useState(false);
  const [editEducationModal, setEditAdvisoryModal] = useState(false);
  const [selectedEducation, setSelectedAdvisory] = useState(null);
  const [alertLabel, setAlertLabel] = useState("");

  const handleAdd = () => {
    setEducation(true);
    setSelectedAdvisory(null);
    console.log("Add button clicked");
  };

  const handleEdit = (event) => {
    setSelectedAdvisory(event);
    setEditAdvisoryModal(true);
    setEducation(true);
  };

  const closeModal = () => {
    setEducation(false);
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
      <ContentContainer title={"Education"}>
        <AddSearch
          addLabel="Add Education"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />

        {alertLabel && <CustomAlert label={alertLabel} />}
        <EducationList
          searchTerm={searchTerm}
          onEdit={handleEdit}
          alertMsg={(label) => setAlertLabel(label)}
          onItemAddedOrUpdated={() => {}}
        />
      </ContentContainer>

      <AddEducation
        addEvacuation={addEducation}
        closeModal={closeModal}
        editEducationModal={editEducationModal}
        selectedEducation={selectedEducation}
        alertMsg={(label) => setAlertLabel(label)}
        onItemAddedOrUpdated={() => {}}
      />
    </PageContainer>
  );
};

export default Education;
