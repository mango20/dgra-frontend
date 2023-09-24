import React from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import CustomTable from "../../../Components/UI/Table/Table";
import { financialReportTC } from "../../../Utils/TableColumns";
import Households from "../../../Data/SampleData/Households.json";
const FinancialReport = () => {
  const tableColumns = financialReportTC;
  return (
    <PageContainer>
      <ContentContainer
        hasArrow={true}
        title={"Calamity Fund - Budget and Expenses"}
      >
        <CustomTable data={Households} columns={tableColumns} />
      </ContentContainer>
      <ContentContainer
        title={"Calamity Fund"}
        hasArrow={true}
      ></ContentContainer>
    </PageContainer>
  );
};

export default FinancialReport;
