import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/useTypesSelector";
import { deleteSocialAction, getUserContacts } from "../redux/actions/actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { yellow, red,grey } from "@mui/material/colors";
import {makeStyles} from "@material-ui/core"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import communicate from "../model/model";


interface Props {
  setIsEdit: React.Dispatch<React.SetStateAction<Boolean>>;
  setEditSocial: React.Dispatch<React.SetStateAction<string>>;
  setIsShow: any;
}

const useStyle=makeStyles({

  cancelBtn:{
    backgroundColor:`${red[500]} !important`,
    "&hover":{
      backgroundColor:`${red[500]} !important`
    },
    fontFamily:"vazir"

  }

})

const UserLinks = ({ setIsEdit, setEditSocial, setIsShow }: Props) => {
  const classes=useStyle()
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteSocialId, setDeleteSocialId] = useState<string| null>(null);
  const [confirmDelete, setConfirmDelete] = useState("");

  const handleClose = () => {
    setOpenModal(false)
    setConfirmDelete("")
  };
  const state = useSelector((state) => state.socials);
  console.log(state);

  useEffect(() => {
    dispatch(getUserContacts());
  }, []);

  const openModalHandler = (id:any) => {
    setOpenModal(true);
    setDeleteSocialId(id)
    
  };
  const deleteSocialHandler = () => {
  
    dispatch(deleteSocialAction(deleteSocialId!));
    setOpenModal(false);
    setConfirmDelete("");
  };

  const editHandler = (id: any) => {
    setIsEdit(true);
    setEditSocial(id);
    setIsShow(true);
  };

  const checkSocial=(item:communicate)=>{
    switch (item.social_type) {
      case "instagram": return <InstagramIcon/>
      case "twitter": return <TwitterIcon/>
      case "facebook": return <FacebookIcon/>
       
    
      default:
        break;
    }
  }
  const checkSocialname=(item:communicate)=>{
    switch (item.social_type) {
      case "instagram": return "اینستاگرام"
      case "twitter": return "تویتر"
      case "facebook": return "فیسبوک"
       
    
      default:
        break;
    }
  }

 

  return (
    <Box>
      {state.socials && (
        <Box>
          {state.socials.map((item) => {
            return (
              <Box
                sx={{ display: "flex", mt: 2, justifyContent: "space-between",backgroundColor:`${grey[600]}`,px:2,py:2 ,  borderRadius: 1,}}
                key={item.id}
              >
                <Box sx={{ display: "flex",alignItems:"center" }}>
                  <Box sx={{ display: "flex",alignItems:"center" }}>
                    <Typography sx={{fontFamily:"vazir",color:`${grey[400]}`}}  variant="body2">{checkSocial(item)}  </Typography>
                    <Typography sx={{color:`${grey[50]}`,mr:1,fontFamily:"vazir"}} variant="body2">{checkSocialname(item)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex",mr:2 }}>
                    <Typography sx={{fontFamily:"vazir",color:`${grey[400]}`}} variant="body2">ای دی (ID)  </Typography>
                    <Typography sx={{color:`${grey[50]}`,mr:1}} variant="body2">{item.social_id}</Typography>
                  </Box>
                  <Box sx={{ display: "flex",mr:2 }}>
                    <Typography sx={{fontFamily:"vazir",color:`${grey[400]}`}} variant="body2">  لینک    </Typography>
                    <Typography sx={{color:`${yellow[600]}`,mr:1}} variant="body2"> {item.social_link}</Typography>
                  </Box>
                  
                 
                </Box>
                <Box sx={{display:"flex"}}>
                  <Box sx={{display:"flex",fontSize:"12px",color:`${yellow[700]}` ,alignItems:"center",cursor:"pointer"}} component="span" onClick={() => editHandler(item.id)}>
                    <EditIcon  sx={{ fontSize: 17,color:`${yellow[700]}`,marginLeft:"3px" }} />
                    ویرایش
                  </Box>
                  <Box
                    onClick={()=>openModalHandler(item.id)}
                    component="span"
                    sx={{cursor:"pointer",display:"flex",fontSize:"12px",color:`${red[400]}` ,alignItems:"center", mr:3}}
                   
                  >
                    <DeleteForeverIcon sx={{ fontSize: 17,color:`${red[400]}`,marginLeft:"3px" }} />
                    حذف
                  </Box>
                </Box>
                <Modal
                  open={openModal}
                  hideBackdrop={true}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="subtitle1"
                      component="h2"
                      style={{color:`${red[500]}`,fontFamily:"vazir"}}
                    >
                      حذف لینک ارتباطی
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        id="name"
                        name="id"
                        label="لطفا کلمه تایید را بنویسید"
                        value={confirmDelete}
                        onChange={(e: any) => setConfirmDelete(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                      }}
                    >
                      <Button
                        size="small"
                        sx={{ ml: 2, backgroundColor: `${yellow[500]} !important`,fontFamily:"vazir",color:"black" }}
                        variant="contained"
                        onClick={handleClose}
                        className={classes.cancelBtn}
                      >
                        انصراف
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          backgroundColor: `${red[500]} !important`,
                          color: "white",
                          fontFamily:"vazir"
                        }}
                        onClick={ deleteSocialHandler}
                        disabled={confirmDelete === "تایید" ? false : true}
                        variant="contained"
                      >
                        حذف
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            );
          })}
        </Box>
      )}

      
    </Box>
  );
};

export default UserLinks;
