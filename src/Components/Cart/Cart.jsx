import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';


export default function Cart() {
  let {getLoggedUserCart , removeCartItem , updateProductQuantity , clearCartItem} = useContext(CartContext);
  let[cartDetails , setCartDetails]= useState(null)

async function updteCount(id , count) {

let{data}=  await updateProductQuantity(id , count)
setCartDetails(data)

}
async function clearAll() {

  let {data}= await clearCartItem();
  setCartDetails(null)

  
}



async function removeItem(id) {

  let {data}= await removeCartItem(id)
  console.log(data);
  setCartDetails(data)

}

 async function getCart() {
    let {data} = await getLoggedUserCart()
    console.log(data);
    setCartDetails(data)
  }

  useEffect(()=>{
getCart()
  },[])
  return <>
  {cartDetails? <div className='w-75 my-3 mx-auto p-3 bg-main-light' >
  <h3>Shopping Cart</h3>
  <h4 className='h6 text-main fw-bolder' >Cart Items :  {cartDetails.numOfCartItems}</h4>
  <h4 className='h6 text-main fw-bolder mb-4' >Total Cart Price :  {cartDetails.data.totalCartPrice} EGP</h4>
  {cartDetails.data.products.map((product)=><div key={product.product._id} className='row border-bottom py-2 px-2' >
    <div className="col-md-2">
      <img className='w-100'  src={product.product.imageCover} alt="" />
    </div>
    <div className="col-md-10">
<div className='d-flex justify-content-between align-items-center'>
<div>
  <h3 className='h6'>{product.product.title.split(' ').slice(0,3).join(' ')} </h3>
  <h6 className='text-main'>Price: {product.price} EGP</h6>
</div>

<div>
  <button onClick={()=>updteCount(product.product._id , product.count + 1)} className='btn p-2 brdr-main'>  +  </button>
  <span className='mx-2'>{product.count}</span>
  <button  onClick={()=>updteCount(product.product._id , product.count - 1)} className='btn p-2 brdr-main'>  -  </button>
</div>

</div>

<button onClick={()=>removeItem(product.product._id)} className='btn p-0'><i className='text-danger font-sm fas fa-trash-can'></i> Remove</button>


    </div>
  </div>
  )}
      <button onClick={()=> clearAll()} className='btn w-100 bg-danger mt-2 text-white'>clear all</button>
     <Link to={'/address'} className='btn bg-main w-35 m-4 text-white mt-2 '> Online payment </Link >
     <button className='btn bg-main w-35 m-4 text-white mt-2 '> Cash on delivery</button>
  </div>
: <section  id='loading' className='d-flex justify-content-center align-items-center '>

<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
</section> }
 
  </>
}
