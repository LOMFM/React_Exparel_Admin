import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    minWidth: "24px",
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkText: {
    padding: 0,
    color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 14,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2),
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
