import React, { useState } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import Collapse from "@mui/material/Collapse";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fade from "@mui/material/Fade";
import Container from "@material-ui/core/Container/Container";
import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { blueGrey,grey } from '@mui/material/colors';
import "./App.css";
import AddNewSocial from "./components/AddNewSocial";
import UserLinks from "./components/UserLinks";
import EditSocial from "./components/EditSocial";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createTheme({ direction: "rtl" });

const useStyle = makeStyles({
  add: {
    color: "yellow",
    marginRight: "10px",
    fontWeight: 600,
  },
});

export default function App() {
  const [isShow, setIsShow] = useState(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [editSocial, setEditSocial] = useState<string>("");
  const classes = useStyle();
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        <Box sx={{backgroundColor:`${grey[100]}`,minHeight:"100vh",display:"flex",alignItems:"center"}}>
          <Container maxWidth="md">
           <Box sx={{backgroundColor:`${grey[400]}`,px:2,py:2,borderRadius: 1 }}>
           <Box
              onClick={() => setIsShow(!isShow)}
              sx={{ display: "flex", mb: 1, cursor: "pointer" }}
            >
              
              {!isEdit ? (
                <>
                <AddIcon sx={{ color: "yellow" }} />
                <Typography className={classes.add} variant="subtitle1">
                  افزوردن راه ارتباطی
                </Typography></>
              ) : (
                <>
                <EditIcon sx={{ color: "yellow" }}/>
                <Typography className={classes.add} variant="subtitle1">
                  ویرایش راه ارتباطی
                </Typography>
                </>
              )}
            </Box>
            {!isEdit && isShow ?<Box sx={{ backgroundColor: `${blueGrey.A700}`, mt: 2,borderRadius: 1  }}>
              <Collapse in={isShow}>
                <AddNewSocial setIsShow={setIsShow} />
              </Collapse>
            </Box>:<Box sx={{ backgroundColor: `${blueGrey.A700}`, mt: 2 ,borderRadius: 1 }}>
              <Collapse in={isShow}>
               <EditSocial setIsShow={setIsShow} setIsEdit={setIsEdit}  editSocial={editSocial}/>
              </Collapse>
            </Box>}

            <UserLinks setIsShow={setIsShow} setEditSocial={setEditSocial} setIsEdit={setIsEdit} />
           </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </StylesProvider>
  );
}
