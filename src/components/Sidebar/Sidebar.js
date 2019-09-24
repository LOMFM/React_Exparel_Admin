import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
  Map as MapIcon,
  PagesOutlined as ASCPageIcon,
  PagesRounded as HOPDPageIcon,
  PeopleOutline as DentalPageIcon,
} from "@material-ui/icons";
// LocalHospital, LocalPharmacy
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Out-Patient", link: "/app/out-patient", icon: <HomeIcon /> ,
    children: [
      {label: 'Global Status', link: "/app/out-patient/global-status"},
      {label: 'Live Status', link: "/app/out-patient/live-status"}
    ]
  },
  {
    id: 1,
    label: "ASC Payer",
    link: "/app/asc-payer",
    icon: <ASCPageIcon />,
    children: [
      {label: 'Basic Information', link: '/app/asc-payer/basic'},
      {label: 'Top 10 Payer', link: '/app/asc-payer/top'},
      {label: 'Commercial Plans', link: '/app/asc-payer/commerical-plan'},
      {label: 'Medicaid Plans', link: '/app/asc-payer/medicaid-plan'}
    ]
  },
  {
    id: 2,
    label: "HOPD Payer",
    link: "/app/hopd-payer",
    icon: <HOPDPageIcon />,
    children: [
      {label: 'Basic Information', link: '/app/hopd-payer/basic'},
      {label: 'Top 10 Payer', link: '/app/hopd-payer/top'},
      {label: 'Commercial Plans', link: '/app/hopd-payer/commerical-plan'},
      {label: 'Medicaid Plans', link: '/app/hopd-payer/medicaid-plan'}
    ]
  },
  {
    id: 3,
    label: "Dental Payer",
    link: "/app/dental-payer",
    icon: <DentalPageIcon />,
    children: [
      {label: 'Statistics', link: '/app/dental-payer/statistics'},
      {label: 'Basic Information', link: '/app/dental-payer/basic'},
      {label: 'Top 10 Payer', link: '/app/dental-payer/top'},
      {label: 'Plans', link: '/app/dental-payer/commercial-plan'},
    ]
  },
  {
    id: 4,
    label: "Surgery Centers",
    link: "/app/surgery",
    icon: <UIElementsIcon />,
    children: [
      {label: 'Statistics', link: '/app/surgery/statistics'},
      {label: 'ASC/Hospital Acess', link: '/app/surgery/list'},
    ],
  },
  {
    id: 5,
    label: "State Coverage",
    link: "/app/state-coverage",
    icon: <MapIcon />,
    children: [
      {label: 'ASC', link: '/app/state-coverage/asc'},
      {label: 'HOPD', link: '/app/state-coverage/hopd'},
      {label: 'In-Patient', link: '/app/state-coverage/in-patient'},
    ]
  },
  {
    id: 6,
    label: "Payers",
    link: 'app/payers',
    icon: <UIElementsIcon />,
    children: [
      {label: 'ASC', link: '/app/payers/asc'},
      {label: 'HOPD', link: '/app/payers/hopd'},
      {label: 'Dental', link: '/app/payers/dental'},
    ]
  }
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  isSidebarOpened = true;
  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
