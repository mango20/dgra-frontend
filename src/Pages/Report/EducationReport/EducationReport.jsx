import React from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import report from "../../../Data/SampleData/report.json";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import landClassification from "../../../Data/landClassification.json";
const EducationReport = () => {
  const labels = ["Population At Risk", "Household At Risk", "Purok 2 At Risk"];
  return (
    <PageContainer>
      <CustomContainer title={"Education"} className="reports">
        <Card
          data={report}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        <div className="reportContent">
          <Select
            label="Name of School"
            data={landClassification}
            className="selectReport"
            defaultOptionLabel="Select Name of School"
          />
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default EducationReport;
