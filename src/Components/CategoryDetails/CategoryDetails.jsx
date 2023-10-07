import React from 'react';
import styles from './CategoryDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';


export default function CategoryDetails() {


  let params = useParams();

  function getCategoryDetalis(id) {
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    
  }
  let {data , isError , isLoading} = useQuery('categoryDetails' ,()=> getCategoryDetalis(params.id) );
  console.log(data?.data.data);
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
</div> </>:<> <div className="row g-4 mt-5">
<div className="col-md-4">
  <img height={300} className='w-100' src={data?.data.data.image} alt={data?.data.data.name} />
</div>
<div className="col-md-8 text-center mt-5">
  <h3 className='text-main' >Name: {data?.data.data.name}</h3>
  <h3 className='text-main mt-5'>Create: {data?.data.data.createdAt} </h3>

</div>
</div>

</>}
    
  </>
}
