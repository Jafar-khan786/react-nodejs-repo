const con = require('../config/connection');
const {isEmpty,save_data,delete_data} = require('../helpar');

class orderController {

    static add_product = async(req,res)=>{
        try {         let p_name = req.body.p_name;
                            let description = req.body.description;
                    if( isEmpty(p_name) || isEmpty(description)){
                        return res.send({"status":false, "msg": "All Field Required","body":''})
                    }

                        let q = `insert into products (p_name,p_description)values( '${p_name}','${description}')`;
                            console.log(q); 
                    
                    
                            con.query(q, function (error, results, fields) {
                                if (error) throw error;
                                if(! isEmpty(results)){
                                    return res.send({"status":true, "msg": "Product add successfully","body":results.insertId})

                                }


                                
                            });
                    
                            } catch (error) { console.log(error);
                                return res.send({"status":false, "msg": "server error","body":''})
                            }
   
    }
    static get_product = async(req,res)=>{
        try {       
                let q = `select * from products `;
                    con.query(q, function (error, results, fields) {
                        if (error) throw error;
                        if(! isEmpty(results)){
                            return res.send({"status":true, "msg": "  Product list","body":results})

                        }else{
                            return res.send({"status":false, "msg": "No Data Found!..","body":''})
                        }


                        
                    });
            
                    } catch (error) { console.log(error);
                        return res.send({"status":false, "msg": "server error","body":''})
                    }

    }

    static add_order = async(req,res)=>{
        try {       
                    let product_ids = req.body.product_ids;
                    let description = req.body.description;
                    if( isEmpty(product_ids) || isEmpty(description)){
                        return res.send({"status":false, "msg": "All Field Required","body":''})
                    }
                    
                    const myArray = product_ids.split(",");   
               
                    if( isEmpty(myArray)){
                        return res.send({"status":false, "msg": "select product than add order ","body":''})
                    }
                    
                    let q = `insert into orders (order_description)values('${description}')`;
                           con.query(q, function (error, results, fields) {
                                if (error) throw error;
                                if(! isEmpty(results)){
                                    myArray.map( async(item)=>{
                                       await save_data({"order_id":results.insertId,"product_id":item}) ;    

                                    }) 

                                    return res.send({"status":true, "msg": "order add successfully","body":results.insertId})

                                }


                                
                            });
                    
                            } catch (error) { console.log(error);
                                return res.send({"status":false, "msg": "server error","body":''})
                            }
   
    }
    static get_order_list  = async(req,res)=>{
        try {     
                let ids = req.params.id; 
                let whr =  isEmpty(ids )? '' : `WHERE a.order_description LIKE '${ids}%'  or a.order_id = '${ids}' ` ;  
            
                let q = `SELECT a.*, COUNT(b.product_id) as p_count FROM orders as a join order_product_map as b on a.order_id = b.order_id  ${whr} GROUP by b.order_id  order by a.order_id DESC`;
                   
                con.query(q, function (error, results, fields) {
                    if (error) throw error;
                    if(! isEmpty(results)){
                        return res.send({"status":true, "msg": "sucess","body":results})

                    }else{
                        return res.send({"status":false, "msg": "No Data Found!..","body":''})
                    }


                    
                });
                            
            } catch (error) { console.log(error);
                return res.send({"status":false, "msg": "server error","body":''})
            }
   
    }
    static order_details  = async(req,res)=>{
        try {       
                            let order_id = req.params.id;
                     if( isEmpty(order_id)){
                         return res.send({"status":false, "msg": "All Field Required","body":''})
                     }

                        let q = `SELECT a.order_id,a.order_description,b.product_id,c.p_name,c.p_description FROM orders as a join order_product_map as b on a.order_id = b.order_id join products as c on b.product_id = c.p_id WHERE a.order_id = ${order_id} `;
                      
                            con.query(q, function (error, results, fields) {
                                if (error) throw error;
                                if(! isEmpty(results)){
                                    return res.send({"status":true, "msg": "sucess","body":results})

                                }else{
                                    return res.send({"status":false, "msg": "No Data Found!..","body":''})
                                }


                                
                            });
                    
                            } catch (error) { console.log(error);
                                return res.send({"status":false, "msg": "server error","body":''})
                            }
   
    }


    static edit_order = async(req,res)=>{
        try {              
                             let id = req.params.id;
                             let product_ids = req.body.product_ids;
                            let description = req.body.description;
                   
                   if( isEmpty(product_ids) || isEmpty(description)){
                        return res.send({"status":false, "msg": "All Field Required","body":''})
                     }


                    const myArray = product_ids.split(",");   
                    

                    if( isEmpty(myArray)){
                        return res.send({"status":false, "msg": "select product than add order ","body":''})
                    }


                        let q = `UPDATE orders SET order_description = '${description}' WHERE order_id = '${id}'   `;
                           con.query(q, function (error, results, fields) {
                                if (error) { console.log(error ) ;   return res.send({"status":false, "msg": "some error","body":''})  }
                                if(! isEmpty(results)){ 
                                        
                                    
                                    let dx = delete_data(id);


                                    myArray.map( async(item)=>{
                                       await save_data({"order_id":id,"product_id":item}) ;    

                                    }) ;

                                    return res.send({"status":true, "msg": "order add successfully","body":results.insertId})

                                }


                                
                            });
                    
                            } catch (error) { console.log(error);
                                return res.send({"status":false, "msg": "server error","body":''})
                            }
   
    }


    static delete_order = async(req,res)=>{
        try {              
                let id = req.params.id;
                          
                   if( isEmpty(id)){
                        return res.send({"status":false, "msg": "All Field Required","body":''})
                     }

                     con.query(`DELETE FROM orders WHERE order_id = "${id}"`, function (error, results, fields) {
                        if (error){ console.log();   return res.send({"status":false, "msg": "some error","body":''})  }else{
                                   
                                         let d_rows =   delete_data(id);
                                        return res.send({"status":true, "msg": "order deleted successfully","body":''});
                            }
                            
                    });

        } catch (error) { console.log(error);
            return res.send({"status":false, "msg": "server error","body":''})
        }

}           




}


module.exports = orderController;

