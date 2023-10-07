import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getBrands = createAsyncThunk('brandSlice/getBrands',
async()=>{
   let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
   return data.data
}

)

let initialState = {brands:[], loading:false , isError:null};

let brandSlice = createSlice({
    name:'brandSlice',
    initialState,
// extraReducers:(bulider)=>{

//           bulider.addCase(getBrands.fulfilled , (state , action)=>{
//             state.brands = action.payload ; 
//             state.loading = false ; 

//           }),
//           bulider.addCase(getBrands.rejected , (state , action )=>{
//             state.isError = action.payload ; 
//                    state.loading = false ; 
//           }),
//           bulider.addCase(getBrands.pending , (state , action)=>{
//             state.loading = true ; 

//           })

// }







   extraReducers:{
    [getBrands.pending]:(state , action)=>{
        state.loading = true ; 
    } ,
      [getBrands.fulfilled]:(state , action)=>{
        state.brands = action.payload ; 
        state.loading = false ; 
      },
      [getBrands.rejected]:(state , action)=>{
        state.isError = action.payload ; 
        state.loading = false ; }

   }
});



export let brandReducer = brandSlice.reducer;