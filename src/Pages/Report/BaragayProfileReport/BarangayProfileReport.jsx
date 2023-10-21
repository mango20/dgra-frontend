import React from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomTab from "../../../Components/UI/Tabs/CustomTab";

const BarangayProfileReport = () => {
  const tabsData = [
    {
      eventKey: "general",
      title: "General Information",
      content: "Tab content for Home",
    },
    {
      eventKey: "demography",
      title: "Demography",
      content: "Tab content for Profile",
    },
    {
      eventKey: "socio",
      title: "Socio-Economic Profile",
      content: "Tab content for Profile",
    },
    {
      eventKey: "health",
      title: "Health",
      content: "Tab content for Profile",
    },
    {
      eventKey: "waterSanitation",
      title: "Water Sanitation",
      content: "Tab content for Profile",
    },
    {
      eventKey: "shelter",
      title: "Shelter",
      content: "Tab content for Shelter",
    },
    {
      eventKey: "basicEd",
      title: "Basic Education",
      content: "Tab content for Basic Education",
    },
  ];
  return (
    <PageContainer>
      <ContentContainer title="Barangay Profile Report">
        <CustomTab defaultActiveKey="general" tabs={tabsData} />
      </ContentContainer>
    </PageContainer>
  );
};

export default BarangayProfileReport;
