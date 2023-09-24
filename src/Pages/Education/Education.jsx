import React, { useState } from "react";
import ContentContainer from "../../Layout/Container/ContentContainer";
import AddSearch from "../../Components/UI/AddSearch/AddSearch";
import AddEducation from "./Content/AddEducation";
import EducationList from "./Content/EducationList";
import PageContainer from "../../Layout/Container/PageContainer";

const Education = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addEducation, setEducation] = useState(false);

  const handleAdd = () => {
    setEducation(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setEducation(false);
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
      <ContentContainer title={"Education"}>
        <AddSearch
          addLabel="Add Education"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <EducationList searchTerm={searchTerm} />
      </ContentContainer>
      <AddEducation addEducation={addEducation} closeModal={closeModal} />
    </PageContainer>
  );
};

export default Education;
