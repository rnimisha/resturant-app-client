
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { type CartItem, type Carts } from "../utils/interface/interface"
import { addToCart, getCartProducts } from "../services/cart.services"



const initialState: Carts = {
    products : []
}

export const fetchCartProducts = createAsyncThunk(
    'carts',
    async(userId: number) =>{
        const response = await getCartProducts(userId)
        return response.data
    }
)

export const postToCart = createAsyncThunk(
    'post/carts',
    async(data: CartItem) => {
        const response = await addToCart(data)
        return response.data
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchCartProducts.fulfilled, (state,action) =>{
                const cartItems: CartItem[] = action.payload
                state.products = cartItems
            })
            .addCase(fetchCartProducts.rejected, (state, action)=>{
                state.products = []
                throw new Error(action.error.message)
            })
            .addCase(postToCart.fulfilled, (state,action) =>{
                const newCartItem: CartItem = action.payload
                state.products = [newCartItem, ...state.products]
            })
            .addCase(postToCart.rejected, (_, action)=>{
                throw new Error(action.error.message)
            })
    }
})

export default cartSlice.reducer