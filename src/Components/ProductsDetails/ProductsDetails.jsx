import React, { useContext } from 'react';
import styles from './ProductsDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function ProductsDetails() {
  let {addToCart} = useContext(CartContext);

 async function addProdctsToCart(id) {
   let response =  await addToCart(id);
if (response.data.status ==='success') {

  toast.success('Product successfully added')
}    
else {
toast.error('Error adding product')

}
  }



  var settings = {
    dots: false,
    infinite: true,
    autoplay: true ,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1 };



  let params= useParams();
  function  getProductsDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    
  }
  let {isLoading , isError , data}= useQuery('productsdetails',()=> getProductsDetails(params.id) )
 ;
  return <>
  {data?.data.data?<div className='row align-items-center'>
  <Helmet>
                <meta name="description" content="" />
                <title>{data?.data.data.title}</title>
              
            </Helmet>
    <div className="col-md-4">
    <Slider {...settings}>
    {data?.data.data.images.map((img)=> <img key={data?.data.data._id} src={img} alt={data?.data.data.title} /> )}
    </Slider>

    </div>
    <div className="col-md-8">
      <h3 className='h5'>{data?.data.data.title}</h3>
      <p>{data?.data.data.description}</p>
      <h6 className='text-main' > {data?.data.data.category.name}</h6>
      <div className='d-flex justify-content-between' >
        <h6 className='text-main' >Price: {data?.data.data.price} EGP</h6>
        <span><i className='fas fa-star rating-color' ></i> {data?.data.data.ratingsAverage} </span>
      </div>
      <button onClick={()=> addProdctsToCart(params.id)} className='btn w-100 bg-main text-white mt-2'>Add to cart</button>

    </div>
  </div> 
  :''}
    
  </>
}
