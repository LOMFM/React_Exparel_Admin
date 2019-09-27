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
import ASCCommercialPlanPage from "../../pages/ascPayerPage/commericalPlanPage";
import ASCMedicaidPlanPage from "../../pages/ascPayerPage/medicaidPlanPage";

import HOPDPayerBasicPage from "../../pages/hopdPayerPage/payerBasicPage";
import TopHOPDPayerPage from "../../pages/hopdPayerPage/topPayerPage";
import HOPDCommercialPlanPage from "../../pages/hopdPayerPage/commericalPlanPage";
import HOPDMedicaidPlanPage from "../../pages/hopdPayerPage/medicaidPlanPage";

import DentalPayerBasicPage from "../../pages/dentalPayerPage/payerBasicPage";
import TopDentalPayerPage from "../../pages/dentalPayerPage/topPayerPage";
import DentalPlanPage from "../../pages/dentalPayerPage/planPage";
import DentalPayerStatisticsPage from "../../pages/dentalPayerPage/payerStatisticsPage";

import ASCPayerListPage from '../../pages/payerDetailPage/ascPayerListPage';
import HOPDPayerListPage from '../../pages/payerDetailPage/hopdPayerListPage';
import DentalPayerListPage from '../../pages/payerDetailPage/dentalPayerListPage';
import SurgeryCenterPage from "../../pages/surgeryPage/surgeryCenter";
import SurgeryListPage from "../../pages/surgeryPage/surgeryList";

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
              <Route path="/app/asc-payer/commerical-plan" component={ASCCommercialPlanPage} />
              <Route path="/app/asc-payer/medicaid-plan" component={ASCMedicaidPlanPage} />
              <Route path="/app/hopd-payer/basic" component={HOPDPayerBasicPage} />
              <Route path="/app/hopd-payer/top" component={TopHOPDPayerPage} />
              <Route path="/app/hopd-payer/commerical-plan" component={HOPDCommercialPlanPage} />
              <Route path="/app/hopd-payer/medicaid-plan" component={HOPDMedicaidPlanPage} />
              <Route path="/app/dental-payer/statistics" component={DentalPayerStatisticsPage} />
              <Route path="/app/dental-payer/basic" component={DentalPayerBasicPage} />
              <Route path="/app/dental-payer/top" component={TopDentalPayerPage} />
              <Route path="/app/dental-payer/commercial-plan" component={DentalPlanPage} />
              <Route path="/app/payers/asc" component={ASCPayerListPage} />
              <Route path="/app/payers/hopd" component={HOPDPayerListPage} />
              <Route path="/app/payers/dental" component={DentalPayerListPage} />
              <Route path="/app/surgery/statistics" component={SurgeryCenterPage} />
              <Route path="/app/surgery/list" component={SurgeryListPage} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
