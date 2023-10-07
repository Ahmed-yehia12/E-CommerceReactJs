import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
 

export default function CartContextProvider(props) {
    let userToken = localStorage.getItem('userToken');
    let headers = {
        token: userToken
    }
    let [cartId , setCartId] = useState(null);

function addToCart(id) {
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId : id
    },
    {
        headers
    }).then((response)=>response)
    .catch((err)=>err)
    
}
function getLoggedUserCart() {
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>response)
    .catch((err)=>err)
    
}


function removeCartItem(productId) {
  return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers
    }).then((response)=>response).catch((err)=>err)
}

function updateProductQuantity(productId , count) {
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {count},{headers}).then((response)=>response).catch((err)=>err)
    
}
function clearCartItem() {
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
          headers
      }).then((response)=>response).catch((err)=>err)
  }


  function onlinePayment(cartId , values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
     {
        shippingAddress:values
     },{headers}).then((response)=>response).catch((err)=>err)
     
 }

 async function getCartId() {
  let{data} =  await getLoggedUserCart()
  setCartId(data?.data._id)

 }

 useEffect(()=>{
    getCartId()
},[])


    return <CartContext.Provider value={ {addToCart ,onlinePayment,cartId , getLoggedUserCart, removeCartItem , updateProductQuantity , clearCartItem}}>
{props.children}
    </CartContext.Provider>
    
}