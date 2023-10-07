import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';


export default function LogIn() {
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  let[error , setError]= useState(null)
   let[isLoading , setLoading]= useState(false)

async function submitLogIn(values) {
  setLoading(true)
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
  
  .catch ((err)=>{setError(err.response.data.message)
     setLoading(false)}
    
    );
    console.log(data);

  if (data.message === 'success'){
  setLoading(false);
  localStorage.setItem('userToken',data.token);
  setUserToken(data.token)
navigate('/');
  }
}

let validationSchema = Yup.object({
email: Yup.string().email('email is invalid').required('email is required'),
password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid must be first character A-Z ').required('password is required'),

})



  let formik = useFormik({
    initialValues:{
    email:"",
    password:""
    }, validationSchema ,
    onSubmit: submitLogIn
  })
  return <>
  <div className='w-75 mx-auto py-5 '>
    {error?  <div className="alert alert-danger">{error} </div>:''}
    <h3>LogIn Now</h3>
    <form onSubmit={formik.handleSubmit}>
   

  <label htmlFor="email">Email:</label>
  <input  id='email' type='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className='form-control' />
  {formik.errors.email &&formik.touched.email ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.email}</div>:''}

  <label htmlFor="password">Password:</label>
  <input  id='password' type='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className='form-control' />
  {formik.errors.password &&formik.touched.password ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.password}</div>:''}


  

{isLoading?<button  className=' btn bg-main text-white mt-2 '>
<Audio
    height = "20  "
    width = "80"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     

  /></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-2 '>LogIn</button>
}



  </form>
  <Link to="/forgetpassword" className='text-success fw-bold mt-3' >Forget Your Password ? </Link>

  </div>

  </>
}

