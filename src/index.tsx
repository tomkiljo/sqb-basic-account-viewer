import {
  createTheme,
  MuiThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core";
import ReactDOM from "react-dom";
import App from "./App";

let theme = createTheme({});
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
