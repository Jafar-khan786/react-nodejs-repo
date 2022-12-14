
import { Link } from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate } from 'react-router-dom';


function Add_order(){
    
    const history = useNavigate();

 const [product_list,setProduct_list] = useState([]);
 const [check_list,setCheck_list] = useState([]);
 const [dis,setDes] = useState('');

    const get_data = async()=>{
        let options1 = { headers: { "Content-type": "application/json" } };
      
        let response = await axios.get('/get_product',{}, options1);

      if(response){
          if(response.data.status){
            setProduct_list(response.data.body);

          }
      }
       
    }

    useEffect(()=>{
        get_data();

           },[]);


           console.log("product_list = = ",product_list) ;  

const checkbox_fun = (e) =>{
    let order_id = e;

  if(check_list.includes(order_id)){

    const newArr = check_list.filter(e => e !== order_id);
    setCheck_list(newArr);

  }else{
      let check_list_old = check_list;
      check_list_old.push(order_id);
      setCheck_list(check_list_old);
  }
   
  return false ;

}
            console.log("check_list ==",check_list);    


const saveData = async(e)=>{
    e.preventDefault();
    try {
           let sendData = {"description" : dis , product_ids : check_list.toString()}
           let options1 = { headers: { "Content-type": "application/json" } };
      
           let response = await axios.post('/add_order',sendData, options1);

           if(response){
               if(response.data.status){
                toast.success(response.data.msg);
                history('/home');
               }else { toast.error('something went wrong please try again'); }

            }else { toast.error('something went wrong please try again'); }

    } catch (err) { console.error(err); toast.error('some errror'); return false; }


}



        return(<>       
            <div className="container">
            <div className="row">
              <div className = "col-3"></div>  
                <div className=" col-6 card">
                    <div className="card-header">
                        <h1>Add New Order</h1>
                        
                    </div>
                    <div className="card-body">
                             <form onSubmit = {(e)=>{ saveData(e)}}>
                              
                                <div className="form-group">
                                    <label for="exampleInputPassword1">order Description</label>
                                    <input type="text" className="form-control" onChange = {(e)=>{setDes(e.target.value)}}  name = 'description' placeholder="order Description" />
                                </div>
                            { (product_list.length >0)? product_list.map((item)=>{
                                 return  <div className="form-check">
                                    <input type="checkbox" style = {{"margin": "5px"}} onChange = {(e)=>{ checkbox_fun(item.p_id)  }}  className="form-check-input"   />
                                    <label className="form-check-label ml-2" >
                                        <div style = {{ "border": "2px solid","width": "100vh" }} >
                                                <p style = {{"color":"green","margin-left": "5px"}} > {item.p_name} </p>
                                                <p style = {{"margin-left": "5px"}} > {item.p_description}</p>
                                             </div>
                                        </label>
                                </div>
                              

                    }) : ''}
                              
                              <div className="row">
                              <div className = 'col-md-2' >  <button type="submit" className="btn btn-primary">Submit</button>  </div>
                              <div className = 'col-md-2'>    <Link to="/home" className="btn btn-danger" >Cancel</Link>  </div>
                            
                            </div>
                                </form>
                               
                    </div>
                  
                    </div>
                    <div className = "col-3"></div>  
                    </div>
              </div>
              <ToastContainer position="top-right" />
         </>);


}

export default Add_order