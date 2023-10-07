import axios from 'axios';
import styles from './UpdatePassword.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Audio } from  'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword() {
let navigate = useNavigate()
  let userToken = localStorage.getItem('userToken');
  let headers = {
      token: userToken
  }
  let[isLoading, setisLoading]= useState(false);
  let[error , setError]= useState(null);


 async function handleUpdatePassword(values) {
  setisLoading(true)
  let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,values,{headers}).catch(()=>setError(data.message))
  setisLoading(false)
  console.log(data.message );
  if (data.message ==="success"){
    toast.success('Password updated successfuly')
    navigate('/login')
  }
  else {
    toast.error('Fail to update password')
  }
}

let validationSchema = Yup.object({
  currentPassword : Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid must be first character A-Z ').required('password is required'),

  password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid must be first character A-Z ').required('password is required'),
  rePassword: Yup.string().oneOf([Yup.ref("password")],'password not matching').required('rePassword is required'),
  
  })


  let formik = useFormik({
    initialValues:{
      currentPassword:"",
    password:"",
    rePassword:""
    },validationSchema ,onSubmit: handleUpdatePassword
  })
  return <> <div className='d-flex justify-content-center align-items-center'>
 <form  className='mt-5 w-50  ' onSubmit={formik.handleSubmit}>

<label htmlFor="currentPassword">Current Password:</label>
<input type="password" className='form-control mb-2 ' name='currentPassword' id='currentPassword' onBlur={formik.handleBlur}  value={formik.values.currentPassword}  onChange={formik.handleChange} />
{formik.errors.currentPassword && formik.touched.currentPassword ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.currentPassword}</div>:''}



<label htmlFor="password">Password:</label>
<input type="password" className='form-control mb-2 ' name='password' id='password' onBlur={formik.handleBlur}  value={formik.values.password}  onChange={formik.handleChange} />
{formik.errors.password &&formik.touched.password ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.password}</div>:''}



<label htmlFor="rePassword">rePassword :</label>
<input type="password" className='form-control mb-2 ' name='rePassword' id='rePassword' onBlur={formik.handleBlur}  value={formik.values.rePassword}  onChange={formik.handleChange} />
{formik.errors.rePassword &&formik.touched.rePassword ?  <div className="alert alert-danger mt-2 p-2"> {formik.errors.rePassword}</div>:''}

{isLoading?<button  className=' btn bg-main text-white mt-2 '>
<Audio
    height = "20  "
    width = "80"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     
  
  /></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-2 '>Update</button>
}




</form>
</div>
  </>
}
