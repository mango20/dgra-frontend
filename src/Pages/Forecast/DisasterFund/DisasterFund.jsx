import React from "react";
import landClassification from "../../../Data/landClassification.json";
import report from "../../../Data/SampleData/report.json";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
const DisasterFund = () => {
  const labels = [
    "Disaster Fund",
    "Forecast Fund",
    "Forecast Fund to Risk Area",
  ];
  return (
    <PageContainer>
      <CustomContainer title={"Disaster Fund"} className="reports">
        <Card
          data={report}
          label={labels}
          hasPeso={true}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        <div className="reportContent">
          <Select
            label="Type of Relief"
            data={landClassification}
            className="selectReport"
            defaultOptionLabel="Select Type of Relief"
          />
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default DisasterFund;
