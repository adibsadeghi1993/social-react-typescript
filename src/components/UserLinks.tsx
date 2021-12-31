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
               return <div key={item.id}>
                   <p>{item.social_type}</p>
                   <p>{item.social_link}</p>
                   <p>{item.social_id}</p>
               </div>
           })}
          
          </div>}
          <h1>hi</h1>
  </div>;
};

export default UserLinks;
