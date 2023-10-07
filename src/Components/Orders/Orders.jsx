import React, {  useContext, useEffect, useState } from 'react';
import styles from './Orders.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';

export default function Orders() {

  let { getLoggedUserCart} = useContext(CartContext);
 let [cartOwner , setCartOwner]= useState(null)

 async function getCartOwner() {
  let{data} =  await getLoggedUserCart()
 setCartOwner(data.data.cartOwner)
 }
 console.log(cartOwner);

 function getUserOrder(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  
 }

 async function getOrders(x) {

  let{data}= await getUserOrder(x)
  console.log(data);
 }
  useEffect(()=>{
     getCartOwner()
    // getOrders(cartOwner)
  },[])
 

  // function getUserOrder(Id) {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`)
    
  // }
  // let {data , isError , isLoading} = useQuery('userOrder', ()=> getUserOrder(cartOwner))
  // console.log(data);
  return <>
    <h1>Orders</h1>
  </>
}
