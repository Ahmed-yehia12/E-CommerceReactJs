import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

export default function ResetCode() {
let [isLoading , setIsLoading] = useState(false);
let [error , setError]= useState(null);
let navigate = useNavigate();
  async  function submitResetCode(values) {
    setIsLoading(true)
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
.catch((err)=>{setError(err.response.statusText)
setIsLoading(false) })
console.log(data);
if (data?.status ==="Success"){
  setIsLoading(false);
  navigate('/resetpassword')
}
  }
  let formik = useFormik({
    initialValues:{
      resetCode:""
    },onSubmit: submitResetCode
  })
  return <> <form onSubmit={formik.handleSubmit} className='w-75 m-auto mt-5' >


  <label className='h2 fw-bold' htmlFor="resetCode">Enter your resetCode:</label>
  <input className='form-control mt-2' type="resetCode" value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} name='resetCode' id='resetCode' />
{error? <div className='alert alert-danger mt-2 p-2'>
  invalid code
</div>:''}

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
