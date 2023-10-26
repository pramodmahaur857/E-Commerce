import React from "react";
import { useEffect } from "react";
import axios from "axios"
import {useDispatch} from "react-redux"
import ProductsUi from "./Component/ProductsUi";
import ProductDetails from "./Component/ProductDetails";
import CartItems from "./Component/CartItems";
import { BrowserRouter,Routes,Route} from "react-router-dom"

const App = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    axios.get("https://dummyjson.com/products?limit=100")
    .then((rej)=>{
      dispatch({
        type:"Adduser", 
        payload:{
          data:rej.data.products,
        }
      })
    })
  })
  return<div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsUi />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartItems />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}
export default App;
