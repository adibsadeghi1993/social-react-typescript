import React, { useState,useEffect } from "react";
import { useFormik} from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { yellow, red } from "@mui/material/colors";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import { addNewSocial } from "../redux/actions/actions";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "../hooks/useTypesSelector";

interface Props {
  setIsShow: any;
}

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

const AddNewSocial = ({ setIsShow }: Props) => {
  const [error, setError] = useState("");
 
  const classes = useStyles();
  const dispatch = useDispatch();
  const { socials } = useSelector((state) => state.socials);


  const { handleChange, handleBlur, values, errors, touched, isValid } =
    useFormik<{
      name: string;
      link: string;
      id: string;
    }>({
      initialValues: {
        name: "",
        link: "",
        id: "",
      },
      validateOnMount:true,
      onSubmit: (): void => {},
      validationSchema: Yup.object().shape({
        name: Yup.string().min(3).max(20).required("is required"),
        link: Yup.string().min(10).max(250).required("is required"),

        id: Yup.string().required("is required"),
      }),
    });
  const submitHandler = (e: React.FormEvent) => {
    console.log("jjjjjjj")
    e.preventDefault();
    if(socials!?.length===0){
      console.log("llllllllllllll")
      dispatch(
        addNewSocial({
          social_type: values.name,
          social_link: values.link,
          social_id: values.id,
        })
      );
      values.name = "";
      values.id = "";
      values.link = "";
      setIsShow(false);
      return
    }else{
      for (const item of socials!) {
        console.log("in for of")
        if (
          item.social_type === values.name &&
          item.social_link === values.link &&
          item.social_id === values.id
        ) {
          setError("این مسیر ارتباطی وجود دارد");
          return
        } else {
          console.log("in else")
          dispatch(
            addNewSocial({
              social_type: values.name,
              social_link: values.link,
              social_id: values.id,
            })
          );
          values.name = "";
          values.id = "";
          values.link = "";
          setIsShow(false);
          return
        }
      }
    }
    
  };
  const handleCollapse = () => {
    values.name = "";
    values.id = "";
    values.link = "";
    setIsShow(false);
  };
 
 
  console.log(isValid)
  return (
    <form style={{ padding: "10px 20px" }} onSubmit={submitHandler}>
      {error ? (
        <Typography style={{color:"red"}} variant="subtitle2">{error}</Typography>
      ) : (
        <Typography style={{color:"yellow"}} variant="subtitle2">افزودن راه ارتباطی</Typography>
      )}
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
            // error={touched.link && Boolean(errors.link)}
            // helperText={touched.link && errors.link}
            variant="outlined"
            onBlur={handleBlur}
            size="small"
            fullWidth
            // style={{ width: 230 }}
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
          sx={{ backgroundColor: `${red[500]}`, color: "white" }}
          onClick={handleCollapse}
          variant="contained"
        >
          انصراف
        </Button>
        <Button
          className={classes.button}
          disabled={!isValid}
          size="small"
          type="submit"
          sx={{ backgroundColor: `${yellow[500]}`, color: "black", mr: 2 }}
          variant="contained"
        >
          ثبت مسیر ارتباطی
        </Button>
      </Box>
    </form>
  );
};

export default AddNewSocial;
