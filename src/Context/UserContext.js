import { createContext, useState } from "react";

export let UserContext = createContext();

export default function  UserContextProvider(props) {  
const [userToken , setUserToken] = useState(null);
// let headers = {
//     token: userToken
// }
// function updateUserPassword(x) {
//     return axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
//     {headers},{x})
// }
    return <UserContext.Provider value={{userToken,setUserToken }}>
        {props.children}
    </UserContext.Provider>
}