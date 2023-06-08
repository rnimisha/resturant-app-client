import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../utils/interface/interface'
import { loginUsers } from '../services/auth.services'

export interface UserInterface{
    user_id: number | null
    email: string 
    name: string
    token: string 
    role: 'C' | 'A' | null,
    loading: boolean
}

const initialState: UserInterface = {
    user_id: null,
    email: '',
    name: '',
    token: '',
    role: null,
    loading: false
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData: User )=>{
        const response = await loginUsers(userData)
        return response.data as User
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
                const userData: User = action.payload as User;
                state.loading = false
                state.user_id = userData.user_id || null
                state.email = userData.email 
                state.token = userData.token || ''
                state.role = userData.role || null
                state.name = userData.name || ''

            })
            .addCase(loginUser.rejected, (state, action) =>{
                state.loading = false
                throw new Error(action.error.message)
            })
    }
})

export default userSlice.reducer