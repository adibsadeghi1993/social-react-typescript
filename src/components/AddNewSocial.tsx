import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

interface Props {}

const AddNewSocial = (props: Props) => {
  const { handleChange, handleBlur, values, errors, touched } = useFormik<{
    name: string;
    link: string;

    id: string;
  }>({
    initialValues: {
      name: "",
      link: "",
      id: "",
    },
    onSubmit: (): void => {},
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(20).required("is required"),
      link: Yup.string().min(10).max(250).required("is required"),

      id: Yup.number().min(1).required("this is should be number"),
    }),
  });
  return (
    <form>
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <Box sx={{display:"flex" ,flexDirection:"column"}}>
          <FormControl variant="outlined" size="small">
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
              style={{ width: 230 }}
            
            >
              <MenuItem value="instagram">instagram</MenuItem>
              <MenuItem value="twitter">twitter</MenuItem>
              <MenuItem value="facebook">facebook</MenuItem>
            </Select>
          </FormControl>
          {(errors.name || touched.name )&&<Typography variant="body1" >{errors.name}</Typography > }
        </Box>
        <Box sx={{ marginRight: 2 }}>
          <TextField
            id="link"
            name="link"
            label="لینک"
            value={values.link}
            onChange={handleChange}
            error={touched.link && Boolean(errors.link)}
            helperText={touched.link && errors.link}
            variant="outlined"
            onBlur={handleBlur}
            size="small"
            style={{ width: 230 }}
          />
        </Box>
        <Box sx={{ marginRight: 2 }}>
          <TextField
            id="name"
            name="id"
            label="ای دی"
            value={values.id}
            onChange={handleChange}
            error={touched.id && Boolean(errors.id)}
            helperText={touched.id && errors.id}
            variant="outlined"
            onBlur={handleBlur}
            size="small"
            style={{ width: 230 }}
          />
        </Box>
      </Box>
    </form>
  );
};

export default AddNewSocial;
