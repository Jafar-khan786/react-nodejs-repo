const { Console } = require('console');
const con = require('./config/connection');


const isEmpty = (value) => (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )

  const save_data = async(body)=>{
    try {         let order_id = body.order_id;
                        let product_id = body.product_id;
                  let q = `insert into  order_product_map (order_id,product_id)values( '${order_id}','${product_id}')`;
                   
                  con.query(q, function (error, results, fields) {
                            if (error){Console.log(error); return false ; } 
                            if(! isEmpty(results)){
                              return results.insertId;
                              }
                     });
                
                        } catch (error) { console.log(error);
                            return res.send({"status":false, "msg": "server error","body":''})
                        }

}

const delete_data = async(id)=>{
    try {
           con.query(`DELETE FROM order_product_map WHERE order_id = "${id}"`, function (error, results, fields) {
             if (error){ console.log(); return false ;   }else{
              console.log('deleted ' + results.affectedRows + ' rows');
              return true ;
             }
                 
         })
        } catch (error) { return false ; }

}


module.exports = {isEmpty,save_data,delete_data};