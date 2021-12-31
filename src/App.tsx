import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container/Container";

import "./App.css";
import AddNewSocial from "./components/AddNewSocial";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createTheme({ direction: "rtl" });

export default function App() {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        <div className="app">
          <Container className="container" maxWidth="md">
            <AddNewSocial/>
          </Container>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}
