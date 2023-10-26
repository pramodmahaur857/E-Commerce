import { useNavigate,Link } from "react-router-dom";
import {  useSelector,useDispatch} from "react-redux";
import "./Product.css"
import { useState,useEffect } from "react";

const CartItems = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [totalPrice,settotalPrice] = useState()
    const [totalItem,settotalItem] = useState()
    const CartUserdata = useSelector(store=>store.Userdata.cartData)
    console.log(totalItem,totalPrice)
    useEffect(()=>{
        let q = 0;
        let p = 0;
        if(CartUserdata){
            for(let i =0;i<CartUserdata.length;i++){
                q += 1;
                p += CartUserdata[i].price
            }
        }
        settotalPrice(p)
        settotalItem(q)
    },[CartUserdata])

    const delItem = (event,index)=>{
        event.stopPropagation()
        const filterItem = CartUserdata.filter((item,inde)=>{
            return index!==inde
        })
        dispatch({
            type:"delItem",
            payload:{
                data:filterItem
            }
        })
        console.log("delete item")
    }

    return<div>
        <div className="Homelink"><Link className="link" to="/">Home</Link></div>
        <div className="mainItemCOntainerCart">
          {CartUserdata && CartUserdata.map((item,index)=>{
                    return<div key={index} className="itemContainer" onClick={()=>navigate(`/product/${item.id}`)}>
                    <img src={item.images[0]} height="250px" width="100%" alt="itemImage"></img>
                    <div> Title: {item.title}</div>
                    <div> Price: {item.price}</div>
                    <div>Discount: {item.discountPercentage}%</div>
                    <button className="adbtn" onClick={(event)=>delItem(event,index)}>Remove</button>
                </div>
            })}
        </div>
        { CartUserdata && CartUserdata.length>0 && <div className="resultdiv">
            <div>Total Item: {totalItem} </div>
            <div> Total Price: {totalPrice}</div>
        </div>}
    </div>
}
export default CartItems;