import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';


export default function Register() {
  let navigate = useNavigate()
  let[error , setError]= useState(null);
let[isLoading, setisLoading]= useState(false);
async function submitRegister(values) {
  setisLoading(true)

  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
  .catch ((err)=>{setError(err.response.data.message)
    setisLoading(false)
     }
    
    );

  if (data.message === 'success'){
    setisLoading(false)
navigate('/login');
  }
}

// function validate(values) {
//   let phoneRegex = /^\+?(\d{1,3})?[ -]?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})$/;
// let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/ ;
//   let errors = {};
//   if(!values.name){
//     errors.name ="Name is required" ; 
//   }

//   else if(values.name.length < 3){
//     errors.name = "Name minLength is 3"
//   }

//   else if(values.name.length > 10 ){
//     errors.name ="Name maxLength is 10"
//   }

//   if(!values.phone){
//     errors.phone = "phone is requierd"
//   }
  
//   else if (!phoneRegex.test(values.phone)){
//     errors.phone = "phone is invalid"
//   }

//   if(!values.email){
//     errors.email = "email is requierd"
//   }
  
//   else if (!emailRegex.test(values.email)){
//     errors.phone = "email is invalid"
//   }
//   return errors ; 
  
// }
let phoneRegex = /^\+?(\d{1,3})?[ -]?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})$/;
let validationSchema = Yup.object({
name: Yup.string().min(3,'the minLength is 3').max(10, 'the maxLength is 10').required( 'the name is required'),
email: Yup.string().email('email is invalid').required('email is required'),
password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid must be first character A-Z ').required('password is required'),
rePassword: Yup.string().oneOf([Yup.ref("password")],'password not matching').required('rePassword is required'),
phone: Yup.string().matches(phoneRegex , 'phone is invalid').required('phone is required')

})



  let formik = useFormik({
    initialValues:{
    name: "",
    phone:"",
    email:"",
    password:"",
    rePassword:"",
    }, validationSchema ,
    onSubmit: submitRegister
  })
  return <>
  <div className='w-75 mx-auto py-5 '>
    {error?  <div className="alert alert-danger">{error} </div>:''}
    <h3>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input id='name'  type='text' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' className='form-control' />
  {formik.errors.name &&formik.touched.name ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.name}</div>:''}


  <label htmlFor="email">Email:</label>
  <input  id='email' type='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className='form-control' />
  {formik.errors.email &&formik.touched.email ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.email}</div>:''}

  <label htmlFor="password">Password:</label>
  <input  id='password' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className='form-control' />
  {formik.errors.password &&formik.touched.password ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.password}</div>:''}


  <label htmlFor="rePassword">rePassword:</label>
  <input  id='rePassword' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' className='form-control' />
  {formik.errors.rePassword &&formik.touched.rePassword ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.rePassword}</div>:''}


  <label htmlFor="phone">Phone:</label>
  <input  id='phone' type='tel' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' className='form-control' />
 {formik.errors.phone &&formik.touched.phone?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.phone}</div>:''}


{isLoading?<button  className=' btn bg-main text-white mt-2 '>
<Audio
    height = "20  "
    width = "80"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  /></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-2 '>Register</button>
}


  </form>
  </div>

  </>
}
