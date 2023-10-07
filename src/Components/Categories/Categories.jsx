import React from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Categories() {

   function getAllCategories() {
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
  }

let {data , isError , isLoading} = useQuery('allCategories',  getAllCategories);


  return <>
  {isLoading?<> <div className='loading' >
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
</div> </> :<> <div className="row">
{data?.data.data.map((category)=> <div key={category._id} className='col-md-3 mt-5' >
  <Link to={`/categorydetails/${category._id}`}>
  <div className='category-item text-center cursor-pointer' >
    <img height={200} className='w-100' src={category.image} alt={category.name} />
   <h4 className='h6 text-main p-3' > {category.name}</h4>
  </div>
  </Link>
 
</div>)}
</div>

</>}
  
  </>
}
