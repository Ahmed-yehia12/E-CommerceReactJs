import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { WishContext } from '../../Context/WishContext';
import { CartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';


export default function WishList() {
  let {addToCart} = useContext(CartContext)
  let {getLoggedUserWishList , removeWishListItem} = useContext(WishContext);
  let [wishListDetails , setWishListDetails] = useState(null)
async function getWishList() {
  let {data} = await getLoggedUserWishList();
  setWishListDetails(data)

}



async function addProductToCart(id) {
  let {data} = await addToCart(id)
  console.log(data);

  if (data?.status ==="success"){
    toast.success('Product added successfully to your cart')
  }
  else {
    toast.error('Error adding product')
  }
  
}

async function removeItem(id) {
  let {data} = await removeWishListItem(id)
getWishList()
}
console.log(wishListDetails?.data);

useEffect(()=>{
  getWishList()
},[])


  return <> {wishListDetails?<>
  <div className=' w-75 mx-auto my-5 bg-main-light' >
    {wishListDetails?.data.map((product)=><div key={product._id} className = 'row border-bottom py-2 px-2' > 
    <div className="col-md-3">
      <img className='w-100' src={product.imageCover} alt={product.slug} />
    </div>
    <div className="col-md-9 d-flex align-items-center justify-content-between">
<div>
  <h3 className='h5 fw-bold'>{product.title.split(' ').slice(0,3).join(' ')}</h3>
  <h6 className='text-success h6 fw-bold'> {product.price} EGP </h6>
  <button className='btn p-0 fw-lighter' onClick={()=>removeItem(product._id)}  ><i className='text-danger font-sm fas fa-trash-can'></i> Remove</button>
</div>
<div>
  <button className='btn btn-outline-success' onClick={()=>{addProductToCart(product._id)
  removeItem(product._id)
  }} >add to cart </button>
</div>
    </div>
    </div>)}
  </div>

  
  
  </>:<>
  <section  id='loading' className='loading '>

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
</section> </>}
   
  
  </>
}
