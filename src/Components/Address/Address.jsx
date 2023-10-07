import React, { useContext } from 'react';
import styles from './Address.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';




export default function Address() {

  let {onlinePayment , cartId} = useContext(CartContext);

async function handleAddressSubmit(values) {
let response = await  onlinePayment(cartId , values)
console.log(response);
window.location.href = response?.data.session.url
  
}


  let formik = useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: ""
    },
    onSubmit:handleAddressSubmit
  })
  return <>
<form  className='mt-5' onSubmit={formik.handleSubmit}>

  <label htmlFor="details">Details</label>
  <input type="text" className='form-control mb-2 ' name='details' id='details' onBlur={formik.handleBlur}  value={formik.values.details}  onChange={formik.handleChange} />

  <label htmlFor="phone">Phone</label>
  <input type="tel" className='form-control mb-2 ' name='phone' id='phone' onBlur={formik.handleBlur}  value={formik.values.phone}  onChange={formik.handleChange} />

  <label htmlFor="city">City</label>
  <input type="text" className='form-control mb-2 ' name='city' id='city' onBlur={formik.handleBlur}  value={formik.values.city}  onChange={formik.handleChange} />

<button type='submit'  className='btn bg-main text-white'>Pay Now</button>



</form>
  </>
}
