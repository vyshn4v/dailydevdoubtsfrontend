import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers, manageUsers } from "../../../../services/users"

export const getAllusers = createAsyncThunk('user/getAll', async (data, { rejectWithValue }) => {
    try {
        const response = await getAllUsers(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const paginaTion = createAsyncThunk('user/paginate', async (data, { rejectWithValue }) => {
    try {
        const response = await getAllUsers(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const approveUsers = createAsyncThunk('user/approve', async (data, { rejectWithValue }) => {
    try {
        const response = await manageUsers(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const rejectUsers = createAsyncThunk('user/reject', async (data, { rejectWithValue }) => {
    try {
        const response = await manageUsers(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})


const initialState = {
    users: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    page: 0
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        clearUsers(){
            return initialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllusers.pending, (state) => {
                state.isLoading = true
            }).addCase(getAllusers.fulfilled, (state, action) => {
                return {
                    ...state,
                    users: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(getAllusers.rejected, (state, action) => {
                return {
                    ...state,
                    users: action.payload.data,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(approveUsers.pending, () => {
                // state.isLoading = true
            }).addCase(approveUsers.fulfilled, (state, action) => {
                const user = action.payload.data
                const Users = state.users.map((data) => {
                    if (data._id == action.meta.arg.id) {
                        return user
                    } else {
                        return data
                    }
                })
                return {
                    ...state,
                    users: Users,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(approveUsers.rejected, (state) => {

                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(rejectUsers.pending, () => {
                // state.isLoading = true
            }).addCase(rejectUsers.fulfilled, (state, action) => {
                const user = action.payload.data
                const Users = state.users.map((data) => {
                    if (data._id == action.meta.arg.id) {
                        return user
                    } else {
                        return data
                    }
                })
                return {
                    ...state,
                    users: Users,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(rejectUsers.rejected, (state) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(paginaTion.pending, (state) => {
                state.isLoading = true
            }).addCase(paginaTion.fulfilled, (state, action) => {
                console.log(action.meta.arg.start);
                return {
                    ...state,
                    users: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                    page: action.meta.arg.start
                }
            }).addCase(paginaTion.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    page: action.meta.arg.page
                }
            })
    }
})

export const { pageUp, pageDown,clearUsers } = usersSlice.actions
export default usersSlice.reducer