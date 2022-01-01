import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import { addNewSocial, getSingleSocial, updatedSocialAction } from "../redux/actions/actions";
import {useSelector} from "../hooks/useTypesSelector"


interface Props {
    editSocial:string,
    setIsEdit:React.Dispatch<React.SetStateAction<Boolean>>,
   setIsShow:any
}

const EditSocial = ({editSocial,setIsEdit,setIsShow}: Props) => {

 const {social} = useSelector(state => state.socials)
 const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getSingleSocial(editSocial))
    }, [editSocial])
 const cancelEditHandler=()=>{
  setIsShow(false)
  setIsEdit(false)
 }
  const { handleChange, handleBlur, values, errors, touched } = useFormik<{
    name: string;
    link: string;
    id: string;
  }>({
    initialValues: {
      name:social?.social_type || "",
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
  const submitHandler=(e:React.FormEvent)=>{
    e.preventDefault()
    dispatch(updatedSocialAction({social_type:values.name,social_link:values.link,social_id:values.id},editSocial))
    setIsEdit(false)
    setIsShow(false)
  }
  return (
    <form style={{padding:"10px 20px"}} onSubmit={submitHandler}>
        <Typography variant="subtitle2">ویرایش مسیر ارتباطی</Typography>
      <Box sx={{ display: "flex", width: "100%", alignItems: "center",mt:2 }}>
        <Box sx={{display:"flex" ,flexDirection:"column",flexGrow: 1,width:"28%"}}>
          <FormControl  fullWidth variant="outlined" size="small">
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
          {(errors.name || touched.name )&&<Typography variant="body1" >{errors.name}</Typography > }
        </Box>
        <Box sx={{ marginRight: 2 ,flexGrow: 1 }}>
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
            fullWidth
            // style={{ width: 230 }}
          />
        </Box>
        <Box sx={{ marginRight: 2,flexGrow: 1 }}>
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
            fullWidth
       
          />
        </Box>
      </Box>
      <Box sx={{display:"flex", justifyContent: 'flex-end',mt:2}}>
      <Button onClick={cancelEditHandler} variant='contained'>انصراف</Button>
      <Button type="submit"  sx={{mr:2}} variant='contained'>ثبت مسیر ارتباطی</Button>
     
      </Box>
    </form>
  );
};

export default EditSocial;
