import React from 'react';
import styles from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";




export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true ,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  
function getCategory() {

  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}


  let {isError , isLoading , data}= useQuery('categorySlider', getCategory);
  return <>
  {data?.data.data?<Slider {...settings} className='mt-4 mb-3'>
     
{  data?.data.data.map((category)=> <img height={200} className='w-100' key={category._id} src={category.image} alt={category.name} />
)}
    </Slider>:''}
  </>
}
