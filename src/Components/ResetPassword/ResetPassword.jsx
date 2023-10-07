import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

export default function ResetPassword() {
let [isLoading , setIsLoading] = useState(false);
let [error , setError]= useState(null);
let navigate = useNavigate();
  async  function submitResetPassword(values) {
    setIsLoading(true)
let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
.catch((err)=>{setError(err.response.statusText)
setIsLoading(false) })
console.log(data);
  setIsLoading(false);
  navigate('/login')
  }
  let formik = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },onSubmit: submitResetPassword
  })
  return <> <form onSubmit={formik.handleSubmit} className='w-75 m-auto mt-5' >


  <label className='h6 fw-bold' htmlFor="email">Enter your email:</label>
  <input className='form-control mt-2' type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' id='email' />
  {error? <div className='alert alert-danger mt-2 p-2'>
  invalid email
</div>:''}

<label className='h6 fw-bold mt-2' htmlFor="newPassword">New password:</label>
  <input className='form-control mt-2' type="password" value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name='newPassword' id='newPassword' />


  {isLoading?<button  className=' btn bg-main text-white mt-2 '>
<Audio
    height = "20  "
    width = "80"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     

  /></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-2 '>verify</button>
}
  </form>
  </>
}
