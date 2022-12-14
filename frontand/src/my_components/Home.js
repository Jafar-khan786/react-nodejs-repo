
import { useState, useEffect } from "react";
import Order_tbl  from "./Order_tbl";
function Home(){
    const[pollData,setPollData] = useState([]);
    useEffect(()=>{  },[]); 

    console.log('fdfffff ==',pollData);
return(
  <>
   <Order_tbl />
  </>


);



}



export default Home;