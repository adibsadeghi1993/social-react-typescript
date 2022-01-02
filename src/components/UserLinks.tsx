import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/useTypesSelector";
import { deleteSocialAction, getUserContacts } from "../redux/actions/actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { yellow, red,grey } from "@mui/material/colors";

import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { idText } from "typescript";

interface Props {
  setIsEdit: React.Dispatch<React.SetStateAction<Boolean>>;
  setEditSocial: React.Dispatch<React.SetStateAction<string>>;
  setIsShow: any;
}

const UserLinks = ({ setIsEdit, setEditSocial, setIsShow }: Props) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteSocialId, setDeleteSocialId] = useState<string| null>(null);
  const [confirmDelete, setConfirmDelete] = useState("");

  const handleClose = () => setOpenModal(false);
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

 

  return (
    <Box>
      {state.socials && (
        <Box>
          {state.socials.map((item) => {
            return (
              <Box
                sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}
                key={item.id}
              >
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{fontFamily:"vazir",color:`${grey[400]}`}}  variant="body2">راه ارتباطی  </Typography>
                    <Typography sx={{color:`${grey[50]}`,mr:1}} variant="body2">{item.social_type}</Typography>
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
                  <Box sx={{display:"flex",fontSize:"12px",color:`${yellow[700]}` ,alignItems:"center"}} component="span" onClick={() => editHandler(item.id)}>
                    <EditIcon  sx={{ fontSize: 17,color:`${yellow[700]}`,marginLeft:"3px" }} />
                    ویرایش
                  </Box>
                  <Box
                    onClick={()=>openModalHandler(item.id)}
                    component="span"
                    sx={{display:"flex",fontSize:"12px",color:`${red[400]}` ,alignItems:"center", mr:3}}
                   
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
                      variant="h6"
                      component="h2"
                    >
                      حذف لینک ارتباطی
                    </Typography>
                    <Box sx={{ mt: 1 }}>
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
                        sx={{ ml: 2, backgroundColor: `${red[500]}` }}
                        variant="contained"
                        onClick={handleClose}
                      >
                        انصراف
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          backgroundColor: `${yellow[500]}`,
                          color: "black",
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
