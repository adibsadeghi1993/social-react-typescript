import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import {
  addNewSocial,
  getSingleSocial,
  updatedSocialAction,
} from "../redux/actions/actions";
import { useSelector } from "../hooks/useTypesSelector";
import { red, yellow } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    "&:hover": {
      backgroundColor: `${yellow[500]} !important`,
    },
  },
  cancelButton: {
    "&:hover": {
      backgroundColor: `${red[500]} !important`,
    },
  },
});
interface Props {
  editSocial: string;
  setIsEdit: React.Dispatch<React.SetStateAction<Boolean>>;
  setIsShow: any;
}

const EditSocial = ({ editSocial, setIsEdit, setIsShow }: Props) => {
  const classes = useStyles();
  const { social } = useSelector((state) => state.socials);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleSocial(editSocial));
  }, [editSocial]);
  const cancelEditHandler = () => {
    setIsShow(false);
    setIsEdit(false);
  };
  const { handleChange, handleBlur, values, errors, touched,isValid } = useFormik<{
    name: string;
    link: string;
    id: string;
  }>({
    initialValues: {
      name: social?.social_type || "",
      link: social?.social_link || "",
      id: social?.social_id || "",
    },
    enableReinitialize: true,
    onSubmit: (): void => {},
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(20).required("is required"),
      link: Yup.string().min(10).max(250).required("is required"),

      id: Yup.string().required("is required"),
    }),
  });
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updatedSocialAction(
        {
          social_type: values.name,
          social_link: values.link,
          social_id: values.id,
        },
        editSocial
      )
    );
    setIsEdit(false);
    setIsShow(false);
  };
  return (
    <form style={{ padding: "10px 20px" }} onSubmit={submitHandler}>
  
      <Typography style={{color:"yellow"}} variant="subtitle2">ویرایش راه ارتباطی</Typography>
   
    <Box sx={{ display: "flex", width: "100%", mt: 2 }}>
      <Box
        sx={{
          width: "30%",
        }}
      >
       <Box>
       <FormControl fullWidth variant="outlined" size="small">
          <InputLabel margin="dense" id="demo-simple-select-label">
            نوع
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.name}
            name="name"
            label="name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            // style={{ width: 230 }}
            fullWidth
          >
            <MenuItem value="instagram">instagram</MenuItem>
            <MenuItem value="twitter">twitter</MenuItem>
            <MenuItem value="facebook">facebook</MenuItem>
          </Select>
        </FormControl>
       </Box>
        
        <Box sx={{mt:1}}>
       {(errors.name && touched.name) ? (
          <Box ><Typography style={{color:"red"}} variant="body1">{errors.name}</Typography></Box>
        ):null}
       </Box>
      
      </Box>
      
      <Box sx={{ marginRight: 2, flexGrow: 1 }}>
       <Box>
       <TextField
          id="link"
          name="link"
          label="لینک"
          value={values.link}
          onChange={handleChange}
          variant="outlined"
          onBlur={handleBlur}
          size="small"
          fullWidth
        />
       </Box>
        
        <Box sx={{mt:1}}>
       {(errors.link && touched.link) ? (
          <Box ><Typography style={{color:"red"}} variant="body1">{errors.link}</Typography></Box>
        ):null}
       </Box>
      </Box>
     
      <Box sx={{ marginRight: 2, flexGrow: 1 }}>
       <Box sx={{mb:1}}>
       <TextField
          id="name"
          name="id"
          label="ای دی"
          value={values.id}
          onChange={handleChange}
          variant="outlined"
          onBlur={handleBlur}
          size="small"
          fullWidth
          style={{color:"white"}}
        />
       </Box>
         <Box >
       {(errors.id && touched.id) ? (
          <Box ><Typography style={{color:"red"}} variant="body1">{errors.id}</Typography></Box>
        ):null}
       </Box>
    </Box>
         
      </Box>
     
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
      <Button
        className={classes.cancelButton}
        size="small"
        sx={{ backgroundColor: `${red[500]}`, color: "white",fontFamily:"vazir" }}
        onClick={cancelEditHandler}
        variant="contained"
      >
        انصراف
      </Button>
      <Button
        className={classes.button}
        disabled={!isValid}
        size="small"
        type="submit"
        sx={{ backgroundColor: `${yellow[500]}`, color: "black", mr: 2 ,fontFamily:"vazir"}}
        variant="contained"
      >
      ویرایش مسیر ارتباطی
      </Button>
    </Box>
  </form>
  );
};

export default EditSocial;
