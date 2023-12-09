import React from "react";
import Select from "../../../Components/Form/Select";
import landClassification from "../../../Data/landClassification.json";
import report from "../../../Data/SampleData/report.json";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
const RiskArea = () => {
  const labels = ["Population At Risk", "Household At Risk", "Purok 2 At Risk"];
  return (
    <PageContainer>
      <CustomContainer title={"Risk Area"} className="reports">
        <Card
          data={report}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        <div className="reportContent">
          <Select
            label="Type of Disaster"
            data={landClassification}
            className="selectReport"
            defaultOptionLabel="Select Type of Disaster"
          />
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default RiskArea;
