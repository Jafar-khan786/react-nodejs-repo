
import { Link,useNavigate } from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Order_tbl(){

  
  const history = useNavigate();
 const [order_list,setOrder_list] = useState([]);

    const get_data = async(search)=>{
        let options1 = { headers: { "Content-type": "application/json" } };
        //let data = await axios.get('/get_order_list',{},options1);

        let url =  (search)?  `/get_order_list/${search}` : '/get_order_list' ;
        let response = await axios.get(url,{}, options1);

      if(response){
          if(response.data.status){
              setOrder_list(response.data.body);

          }
      }
       
    }

    useEffect(()=>{
        get_data('');

           },[]);


           console.log("order_list = = ",order_list) ;  

const search_fun = (e)=>{
    let dee = e.target.value;
   
    console.log( "search_fun=== ",dee); 
    get_data(dee);
}


const delete_fun = async(id) =>{

   console.log("delete id is == ",id); 
   let options1 = { headers: { "Content-type": "application/json" } };
   let url = `delete_order/${id}`;
   let response = await axios.delete(url,{}, options1);

   if(response){
       if(response.data.status){
            toast.success(response.data.msg);
                get_data();
          }else { toast.error('something went wrong please try again'); }

       }else { toast.error('something went wrong please try again'); }

      }

        return(<>
<div className="container">
 
  <div className = 'row' >
  <div className = 'col-6'> <h1>Order Management</h1>  </div> 

     <div className = 'col-6'>
        <input type = 'text'  className = ''  onChange = { (e)=>{search_fun(e)}}  style= {{
              "margin-left": "84%" ,"margin-bottom": "2%" }} placeholder= "Search Order Description " /> 
       </div>
  </div>

  <table className="table table-hover" style= {{"border":" 5px solid"}} >
    <thead>
      <tr>
        <th># </th>
        <th>order id </th>
        <th>Order Description</th>
        <th>Count Product</th>
        <th>Crated Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     
    {(order_list.length>0)? order_list.map( (item,index)=>{
          let e_url = `/Edit_order/${item.order_id}`;
         
          return <tr>
                        <td>{index+1}</td>
                        <td>{item.order_id}</td>
                        <td>{item.order_description}</td>
                        <td>{item.p_count}</td>
                        <td>{item.date.split("T",1)}</td>
                        <td ><Link to={e_url}  className="fa fa-edit "  >edit</Link> 
                        
                        <button  className="fa fa-trash-o pl-5" onClick ={ (e)=>{ delete_fun(item.order_id)}}  style={{"color":"red"}}></button>
                        </td>
                    </tr>

    }  ):'' }


    </tbody>
  </table>
<div >
    <Link to="/Add_order"  className = "btn btn-info" >Add order</Link>
    <Link to="/Add_product" className = "btn btn-success">Add product</Link>
    <br></br>
    <br></br>
</div>

</div>
        
<ToastContainer position="top-right" />
        </>);


}

export default Order_tbl;