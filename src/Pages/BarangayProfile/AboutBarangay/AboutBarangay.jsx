import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import Form from "./Content/Form";

const AboutBarangay = () => {
  return (
    <PageContainer>
      <ContentContainer title={"About Barangay"}>
        <Form />
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutBarangay;
