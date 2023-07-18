import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { adminLogin } from "../../../../services/userAuth"

export const loginAdmin = createAsyncThunk('admin/signup', async (user, { rejectWithValue }) => {
    try {
        const response = await adminLogin(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const initialState = {
    admin: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDarkMode: false
}
export const userSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin(state, action) {
            state.admin = action.payload
            state.isSuccess = true
        },
        changeStatus(state) {
            localStorage.setItem("admin", JSON.stringify({ ...state.admin, isVerified: true }))
            state.user.isVerified = true
        },
        TurnOnDarkMode(state) {
            state.isDarkMode = !state.isDarkMode
        },
        clearAdminData() {
            return initialState
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAdmin.pending, (state) => {
            state.isLoading = true
        }).addCase(loginAdmin.fulfilled, (state, action) => {
            return {
                ...state,
                admin: action.payload.data,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        }).addCase(loginAdmin.rejected, (state, action) => {
            return {
                ...state,
                admin: action.payload.data,
                isLoading: false,
                isError: true,
                isSuccess: false
            }
        })
    }
})


export const { addAdmin, changeStatus, clearAdminData, TurnOnDarkMode } = userSlice.actions
export default userSlice.reducer
