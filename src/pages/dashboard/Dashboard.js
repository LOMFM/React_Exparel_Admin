import React, { useState } from "react";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";

export default function Dashboard(props) {
  // local
  return (
    <>
      <PageTitle title="Dashboard" button="Latest Reports" />
    </>
  );
}