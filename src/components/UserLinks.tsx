import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/useTypesSelector";
import { getUserContacts } from "../redux/actions/actions";


interface Props {}

const UserLinks = (props: Props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.socials);
console.log(state)

  useEffect(() => {
      dispatch(getUserContacts())
  }, []);

  return <div>
      {state.socials && <div>
          { state.socials.map((item)=>{
               return <Box sx={{display:"flex",mt:2}} key={item.id}>
                   <Typography variant="subtitle2">راه ارتباطی : {item.social_type}</Typography>
                   <Typography mr={2} variant="subtitle2"> لینک : {item.social_link}:</Typography>
                   <Typography mr={2}  variant="subtitle2">آی دی : {item.social_id}</Typography>
               </Box >
           })}
          
          </div>}
          <h1>hi</h1>
  </div>;
};

export default UserLinks;
