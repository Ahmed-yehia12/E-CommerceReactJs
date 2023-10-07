import React, { useEffect } from 'react';
import styles from './Brands.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../Redux/brandSlice';
import { BallTriangle } from 'react-loader-spinner';
export default function Brands() {

let {brands , loading , isError} = useSelector((state)=>state.brands);
let dispatch = useDispatch()
useEffect(()=>{
dispatch(getBrands())
},[])

  return <>
   {loading?<div className='loading' >
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
</div>:
<div className='row'>
  {brands.map((brand)=> <div key={brand._id} className="col-md-2">
    <div className="brand text-center cursor-pointer">
      <img className='w-100' src={brand.image} alt="brand" />
      <h4 className="h6 text-main">{brand.name}</h4>
    </div>
  </div>)}
 
  </div>}
  </>
}
