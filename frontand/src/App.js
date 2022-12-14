
import { Routes, Route } from "react-router-dom";

import  Home from "./my_components/Home";
import  Add_order from "./my_components/Add_order";
import  Edit_order from "./my_components/Edit_order";
import  Add_product from "./my_components/Add_product";

function App() {
  return (
        <>
            <Routes>
              <Route path = "/" element = {<Home />}  />
              <Route path="/home" element={ <Home/> } />
              <Route path="/Add_order" element={ <Add_order/> } />
              <Route path="/Edit_order/:id" element={ <Edit_order/> } />
              <Route path="/Add_product" element={ <Add_product/> } />
            </Routes>
        </>
  );
}

export default App;
