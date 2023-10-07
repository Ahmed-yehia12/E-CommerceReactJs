import axios from "axios";
import { createContext } from "react";


export let WishContext = createContext();

export default function WishContextProvider(props) {

    let userToken = localStorage.getItem('userToken');
    let headers = {
        token: userToken
    }


  function addToWishList(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:id
    },{headers}).then((response)=>response).catch((err)=>err)
    
  }

  function getLoggedUserWishList(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
  }

  function removeWishListItem(product) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${product}`,
    {headers})
    
  }


    return <WishContext.Provider value={{addToWishList , getLoggedUserWishList , removeWishListItem}}>
       {props.children}

    </WishContext.Provider>
    
}