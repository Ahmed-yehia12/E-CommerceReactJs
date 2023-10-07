import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import ProductsDetails from '../ProductsDetails/ProductsDetails';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';



export default function FeaturedProducts() {

  let {addToCart} = useContext(CartContext);
  let {addToWishList , getLoggedUserWishList , removeWishListItem} = useContext(WishContext);
  let [wishListDetails , setWishListDetails, ] = useState(null)

  async function getWishList() {
    let {data} = await getLoggedUserWishList();
    setWishListDetails(data)
  
  }

  async function removeItem(id) {
    let {data} = await removeWishListItem(id)
  getWishList()
  }

useEffect(()=>{
  getWishList()
},[])


  async function addProductsToWishList(id){
    let {data}  = await addToWishList(id)
    console.log(data?.message);
if (data?.status ==="success"){
  toast.success('Product added successfully to your wishlist')
}
else {
  toast.error('Error adding product')
}
  }





 async function addProdctsToCart(id) {
   let response =  await addToCart(id);
if (response.data.status ==='success') {

  toast.success('Product successfully added')
}    
else {
toast.error('Error adding product')

}
  }

function getFeaturedProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  
}
let {isLoading , isError , data , isFetched ,refetch} =useQuery('featuredProducts', getFeaturedProducts ,{
  // enabled:false
});
// let [products , setProducts]= useState([]);
// let [isLoading , setIsLoading] = useState(false)

//  async function getFeaturedProducts() {
//   setIsLoading(true);
//     let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
// setProducts(data.data)   
//   }
//   useEffect(()=>{
//     getFeaturedProducts() 
//   },[])
  return <>
  {isLoading?<>  <div className='loading' >
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
  </div></>:<>
  <div className="container py-2" >
  <div className="row">
    {data?.data.data.map  ((product)=> <div key={product.id} className='col-md-3 '>
      <div className='product py-3 px-2 cursor-pointer'>
      <Link to={`/productsdetails/${product.id}`} >

        <img className='w-100' src={product.imageCover} alt={product.title} />
        <span  className='text-main fw-bolder font-sm'>{product.category.name}</span>
<h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
</Link>

<div className='d-flex justify-content-between mt-3 mb-2'>
  <span>{product.price} EGP</span>
  <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
  {wishListDetails?.data.find((el)=>el._id === product._id)?  <span className=' ' onClick={()=>{ getWishList() 
 removeItem(product._id)  }}  > <i className="fa-solid fa-heart fa-2xl text-danger"></i></span>
:  <span className=' ' onClick={()=>addProductsToWishList(product.id)}  > <i className="fa-solid fa-heart fa-2xl"></i></span>
}

</div>
<button onClick={()=>addProdctsToCart(product.id)} className='btn bg-main text-white w-100'>Add to cart</button>
      </div>
    
    </div>) }
    
  </div>
  
  </div>



  </>}

  
  </>
}
