import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import Collapse from '@mui/material/Collapse';
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fade from '@mui/material/Fade';
import Container from "@material-ui/core/Container/Container";
import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';

import "./App.css";
import AddNewSocial from "./components/AddNewSocial";
import UserLinks from "./components/UserLinks";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createTheme({ direction: "rtl" });

const useStyle = makeStyles({
  add: {
    color:"yellow",
    marginRight:"10px",
    fontWeight:600,
  },
});

export default function App() {
  const [isShow, setIsShow] = React.useState(false);
  const classes = useStyle();
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        <div className="app">
          <Container className="container" maxWidth="md">
            <Box onClick={()=>setIsShow(!isShow)} sx={{display:"flex",mb:1,cursor:"pointer"}}>
              <AddIcon sx={{ color:"yellow" }}/>
              <Typography className={classes.add} variant="subtitle2">
                افزوردن راه ارتباطی
              </Typography>
            </Box>
            <Box sx={{backgroundColor:"green",mt:2}}>
            <Collapse  in={isShow}>
            <AddNewSocial />
            </Collapse>
        
      </Box>
            
           
          <UserLinks/>
          </Container>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}
