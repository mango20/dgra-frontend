import React, { useState } from "react";
import ContentContainer from "../../Layout/Container/ContentContainer";
import Form from "./Content/Form";
import CustomButton from "../../Components/Form/Button";
import CustomModal from "../../Components/UI/Modal/CustomModal";
import PageContainer from "../../Layout/Container/PageContainer";

const BarangayProfile = () => {
  return (
    <PageContainer>
      <ContentContainer title={"About Barangay"}>
        <Form />
      </ContentContainer>
    </PageContainer>
  );
};

export default BarangayProfile;
