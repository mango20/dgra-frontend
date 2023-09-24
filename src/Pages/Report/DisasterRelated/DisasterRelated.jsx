import React from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import report from "../../../Data/SampleData/report.json";

import landClassification from "../../../Data/landClassification.json";
const DisasterRelated = () => {
  const labels = ["Top Population", "Total Household", "Household At Risk"];
  return (
    <PageContainer>
      <CustomContainer title={"Disaster Related Job"} className="reports">
        <Card
          data={report}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        {/* <div className="reportContent">
          <Select
            label="Name of School"
            data={landClassification}
            className="selectReport"
            defaultOptionLabel="Select Name of School"
          />
        </div> */}
      </CustomContainer>
    </PageContainer>
  );
};

export default DisasterRelated;
