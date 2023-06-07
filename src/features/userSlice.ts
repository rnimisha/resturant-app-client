import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorResponse, User } from '../utils/interface/interface'
import { loginUsers } from '../services/auth.services'

export interface UserInterface{
    user_id: number | null
    email: string 
    name: string
    token: string 
    role: 'C' | 'A' | null,
    loading: boolean
    error: string
}

const initialState: UserInterface = {
    user_id: null,
    email: '',
    name: '',
    token: '',
    role: null,
    loading: false,
    error: ''
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: User )=>{
        try{
            const response = await loginUsers(userData)
            return response
        }
        catch(error){

            return error
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(state, action)
                state.loading = false
                state.error = ''
            })
            .addCase(loginUser.rejected, (state) =>{
                state.loading = false
                state.error = 'error'
            })
    }
})

export default userSlice.reducer