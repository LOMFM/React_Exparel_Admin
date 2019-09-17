import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// context
import { useLayoutState } from "../../context/LayoutContext";
import PatientLiveStatus from "../../pages/patientLiveStatus/patientLiveStatus";
import PatientGlobalStatus from '../../pages/patientGlobalStatus/PatientGlobalStatus';
import ASCPayerBasicPage from "../../pages/ascPayerPage/ASCPayerBasicPage";
import TopASCPayerPage from "../../pages/ascPayerPage/topPayerPage";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/out-patient/global-status" component={PatientGlobalStatus} />
              <Route path="/app/out-patient/live-status" component={PatientLiveStatus} />
              <Route path="/app/asc-payer/basic" component={ASCPayerBasicPage} />
              <Route path="/app/asc-payer/top" component={TopASCPayerPage} />
              <Route path="/app/asc-payer/commerical-plan" component={PatientLiveStatus} />
              <Route path="/app/asc-payer/medicaid-plan" component={PatientLiveStatus} />
              <Route path="/app/hopd-payer/basic" component={PatientLiveStatus} />
              <Route path="/app/hopd-payer/top" component={PatientLiveStatus} />
              <Route path="/app/hopd-payer/commerical-plan" component={PatientLiveStatus} />
              <Route path="/app/hopd-payer/medicaid-plan" component={PatientLiveStatus} />
              <Route path="/app/dental-payer/statistics" component={PatientLiveStatus} />
              <Route path="/app/dental-payer/basic" component={PatientLiveStatus} />
              <Route path="/app/dental-payer/top" component={PatientLiveStatus} />
              <Route path="/app/dental-payer/commercial-plan" component={PatientLiveStatus} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
