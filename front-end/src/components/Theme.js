import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#000000", contrastText: "#ffffff" },
    //primary: { main: "#000000", contrastText: "#ffffff" },


    action: { main: "#eed36b", contrastText: "#eed36b" },
    gold: "#eed36b",


    red: red,
    secondary: {
      main: "#eed36b",
      contrastText: "#000000",
    },
  },

  // breakpoints: {
  //   values: {
  //     small: 720,
  //   },
  // },
});

export default theme;
