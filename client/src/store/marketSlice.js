import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_REQUESTED_URL } from "../urls.js";
import axios from "axios";
// import jscookie from 'js-cookie'
export const EquipmentMarket=createAsyncThunk('marketSlice/EquipmentMarket',async(token)=>{
    try{
        var equipment=await axios.get(USER_REQUESTED_URL+'/marketEquipment');
        return equipment.data.equipment;

    }catch(err){
        console.log("Error in Equipment thunk",err);
    }

});

export const LandMarket=createAsyncThunk('marketSlice/LandMarket',async(token)=>{
    try{
        var Land=await axios.get(USER_REQUESTED_URL+'/marketLand');
        return Land.data.agriLand;

    }catch(err){
        console.log("Error in Land thunk",err);
    }

})

export const storageMarket=createAsyncThunk('marketSlice/storageMarket',async(token)=>{
    try{
        var storage=await axios.get(USER_REQUESTED_URL+'/marketStorage');
        return storage.data.storage;

    }catch(err){
        console.log("Error in storage thunk",err);
    }

})

export const getCart=createAsyncThunk("userSlice/getCart",async(cartObj)=>{
    try {
        var obj = await axios.post(USER_REQUESTED_URL + `/getCartitems`, cartObj);
        console.log("inside getCart thunk", obj.data);
        return obj.data;
    } catch (err) {
        console.error("Error in getCart thunk:", err);
        throw err; // Re-throw the error to let it propagate to the calling code
    }

});
export const addTocart=createAsyncThunk("userSlice/addTocart",async(cartObj)=>{
    try{
        var obj=await axios.post(USER_REQUESTED_URL+`/addTocart`,cartObj);
        console.log("inside addCart thunk",obj);
        return obj.data;
    }catch(err){
        console.log("Error in add cart thunk");
        throw err;
    }
   

});
export const updateCartqty = createAsyncThunk(
    "marketSlice/updateQuantityInDatabase",
    async ({ _id,productId, quantity,token,email }) => {
      try {
        await axios.post(`${USER_REQUESTED_URL}/updateCartQuantity`, {_id,productId, quantity,token,email });
        return { productId, quantity };
      } catch (error) {
        console.error("Error updating quantity in the database:", error);
        throw error;
      }
    }
  );
  export const removeCart = createAsyncThunk(
    "marketSlice/removeCart",
    async ({cartId,productId,token,email }) => {
      try {
        const remove= await axios.post(`${USER_REQUESTED_URL}/removeCart`, {cartId,productId,token,email });
        console.log("response in remove cart thunk",remove)
        let removed= {data:remove.data,status:remove.status}
        return removed;
      } catch (error) {
        console.error("Error while removing item from cart:", error);
        throw error;
      }
    }
  );
  export const updateProductQuantityInStore = createAsyncThunk(
    "marketSlice/updateProductQuantityInStore",
    async ({ productId, quantity }) => {
      return { productId, quantity };
    }
  );

  export const getCartequipment=createAsyncThunk("userSlice/getCartequipment",async(cartObj)=>{
    try {
        var obj = await axios.post(USER_REQUESTED_URL + `/equipmentCartitems`, cartObj);
        console.log("inside getCartequipment thunk", obj.data);
        return obj.data;
    } catch (err) {
        console.error("Error in getCartequipment thunk:", err);
        throw err; // Re-throw the error to let it propagate to the calling code
    }

});

  export const addTocartEqp=createAsyncThunk("userSlice/addTocartEqp",async(cartObj)=>{
    try{
        var obj=await axios.post(USER_REQUESTED_URL+`/addTocartGrain`,cartObj);
        console.log("inside addCartEqp thunk",obj);
        return obj.data;
    }catch(err){
        console.log("Error in add cartGrain thunk");
        throw err;
    }
   

});

export const updateCartqtyEquipment = createAsyncThunk(
    "marketSlice/updateQuantityEquipment",
    async ({ _id,productId, quantity,token,email }) => {
      try {
        await axios.post(`${USER_REQUESTED_URL}/updateCartQuantityequipment`, {_id,productId, quantity,token,email });
        return { productId, quantity };
      } catch (error) {
        console.error("Error updating equipment quantity in the database:", error);
        throw error;
      }
    }
  );
  export const removeCartequipment = createAsyncThunk(
    "marketSlice/removeCartEquipment",
    async ({cartId,productId,token,email }) => {
      try {
        const remove= await axios.post(`${USER_REQUESTED_URL}/removeCartequipment`, {cartId,productId,token,email });
        console.log("response in remove cartequipment thunk",remove)
        let removed= {data:remove.data,status:remove.status}
        return removed;
      } catch (error) {
        console.error("Error while removing item from equipmentcart:", error);
        throw error;
      }
    }
  );




const marketSlice=createSlice({
    name:'marketSlice',
    initialState:{
         equipment:[],
         agriLand:[],
         storage:[],
         cartItem:[]


    },
    extraReducer:(builder)=>{
        builder.addCase(EquipmentMarket.fulfilled,(state,action)=>{
            console.log("Equipment in reducer",action.payload);
            state.equipment=action.payload;

        }).addCase(LandMarket.fulfilled,(state,action)=>{
            console.log("Land in reducer",action.payload);
            state.agriLand=action.payload;

        }).addCase(storageMarket.fulfilled,(state,action)=>{
            console.log("storagein reducer",action.payload);
            state.storage=action.payload;

        }).addCase(getCart.fulfilled,(state,action)=>{
            console.log("action in reducer getCart",action);
            state.cartItem=([...action.payload]);


        }).addCase(addTocart.fulfilled,(state,action)=>{
            console.log("action in reducer addToCart",action.payload);


        }).addCase(removeCart.fulfilled,(state,action)=>{
            console.log("action in reducer removeCart",action.payload);


        }).addCase(updateProductQuantityInStore.fulfilled, (state, action) => {
            const { productId, quantity } = action.payload;
            state.cartItem = state.cartItem.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            );
          }).addCase(getCartequipment.fulfilled,(state,action)=>{
            console.log("action in reducer getCartequipment",action);
            state.cartItem=([...action.payload]);


        }).addCase(addTocartEqp.fulfilled,(state,action)=>{
            console.log("action in reducer addToCart",action.payload);


        })
        .addDefaultCase((state, action) => {
        });;
    },
    reducers:{
        market:(state,action)=>{

        }
    }

});
export default marketSlice.reducer;
