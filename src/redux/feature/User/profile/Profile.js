import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import services from "../../../../services/users"
export const getProfile = createAsyncThunk('profile/getProfileDetails', async (user, { rejectWithValue }) => {
    try {
        const response = await services.getProfile(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
        
    }
})


const initialState = {
    profile: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDarkMode: false,
    errorMessage: ""
}
export const userSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addUser(state, action) {
            state.user = action.payload
            state.isSuccess = true
        },
        changeStatus(state) {
            localStorage.setItem("user", JSON.stringify({ ...state.user, isVerified: true }))
            state.user.isVerified = true
        },
        TurnOnDarkMode(state) {
            state.isDarkMode = !state.isDarkMode
        },
        clearUserData() {
            return initialState
        },
        addProfileImage(state, { payload }) {
            localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), profile_image: payload }))
            state.profile.profile_image = payload
        },
        updateEditRequest(state, { payload }) {
            console.log(payload);
            state.profile.editAnswerRequests=state.profile?.editAnswerRequests?.filter((request)=>request?._id!==payload);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true
            }).addCase(getProfile.fulfilled, (state, action) => {
                return {
                    ...state,
                    profile: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,

                }
            }).addCase(getProfile.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errorMessage: action.payload?.message || action.payload
                }
            })

    }
})

export const { addUser, changeStatus, clearUserData, TurnOnDarkMode, addProfileImage,updateEditRequest } = userSlice.actions
export default userSlice.reducer