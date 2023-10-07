import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import UserContextProvider, { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import WishList from './Components/WishList/WishList';
import WishContextProvider from './Context/WishContext';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetCode from './Components/ResetCode/ResetCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';


let routes = createHashRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'Cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'address' , element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:'updatepassword' , element:<ProtectedRoute><UpdatePassword/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute>},

    {path:'productsdetails/:id' , element:<ProtectedRoute><ProductsDetails/></ProtectedRoute>},
    {path:'categorydetails/:id' , element:<CategoryDetails><ProductsDetails/></CategoryDetails>},

    {path:'Login' , element:<Login/>},
    {path:'forgetpassword' , element:<ForgetPassword/>},
    {path:'resetcode' , element:<ResetCode/>},
    {path:'resetpassword' , element:<ResetPassword/>},
    {path:'Register' , element:<Register/>},
  ] }
])

export default function App() {
  let {setUserToken}= useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
     setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  
  
  return <WishContextProvider> 
     <CartContextProvider>
<Provider store={store}>
<RouterProvider router={routes}></RouterProvider>
<Toaster/>
</Provider>
  </CartContextProvider>
  </WishContextProvider>

}
