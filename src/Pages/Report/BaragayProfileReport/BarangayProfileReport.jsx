import React from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomTab from "../../../Components/UI/Tabs/CustomTab";
import GeneralInformation from "./Content/GeneralInformation";
import Demography from "./Content/Demography";
import SocioEconomic from "./Content/SocioEconomic";
import Health from "./Content/Health";
import WaterSanitation from "./Content/WaterSanitation";
import Shelter from "./Content/Shelter";
import BasicInformation from "./Content/BasicEducation";
import BasicEducation from "./Content/BasicEducation";

const BarangayProfileReport = () => {
  const tabsData = [
    {
      eventKey: "general",
      title: "General Information",
      content: <GeneralInformation />,
    },
    {
      eventKey: "demography",
      title: "Demography",
      content: <Demography />,
    },
    {
      eventKey: "socio",
      title: "Socio-Economic Profile",
      content: <SocioEconomic />,
    },
    {
      eventKey: "health",
      title: "Health",
      content: <Health />,
    },
    {
      eventKey: "waterSanitation",
      title: "Water Sanitation",
      content: <WaterSanitation />,
    },
    {
      eventKey: "shelter",
      title: "Shelter",
      content: <Shelter />,
    },
    {
      eventKey: "basicEd",
      title: "Basic Education",
      content: <BasicEducation />,
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
