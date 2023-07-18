import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginWithEmailAndPassword, loginWithGoogle, signupWithEmailAndPassword, signupWithGoogle } from '../../../../services/userAuth'
import services from "../../../../services/users"
import questionServices from "../../../../services/question"

export const SignupUser = createAsyncThunk('user/signup', async (user, { rejectWithValue }) => {
    try {
        const response = await signupWithEmailAndPassword(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const SignupWithGoogle = createAsyncThunk('user/signupWithGoogle', async (access_token, { rejectWithValue }) => {
    try {
        const response = await signupWithGoogle(access_token)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const LoginWithGoogle = createAsyncThunk('user/loginWithGoogle', async (access_token, { rejectWithValue }) => {
    try {
        const response = await loginWithGoogle(access_token)
        return response.data
    } catch (err) {

        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const LoginUser = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
    try {
        const response = await loginWithEmailAndPassword(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const followUser = createAsyncThunk('user/follow', async (user, { rejectWithValue }) => {
    try {
        const response = await services.followUnfollowUser(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const UnFollowUser = createAsyncThunk('user/unfollow', async (user, { rejectWithValue }) => {
    try {
        const response = await services.followUnfollowUser(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const addToBookmarkQuestion = createAsyncThunk('user/bookmark', async (data, { rejectWithValue }) => {
    try {
        const response = await questionServices.addToBookmarkQuestion(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const removeFromBookmarkQuestion = createAsyncThunk('user/removeBookmark', async (data, { rejectWithValue }) => {
    try {
        const response = await questionServices.removeFromBookmarkQuestion(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDarkMode: false,
    errorMessage: ""
}
export const userSlice = createSlice({
    name: 'user',
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
        updateState(state) {
            state.user = JSON.parse((localStorage.getItem('user')))
        },
        updateBookMark(state,action) {
            const newBookmark = JSON.parse(localStorage.getItem('user')).bookmark?.filter((data) => data != action.payload)
            localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), bookmark: JSON.parse(localStorage.getItem('user')).bookmark ? newBookmark : null }))
            if (state.user.bookmark) {
                state.user.bookmark = newBookmark
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(SignupUser.pending, (state) => {
            state.isLoading = true
        }).addCase(SignupUser.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                isError: false,
                isSuccess: true,

            }
        }).addCase(SignupUser.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: action.payload?.message || action.payload
            }
        }).addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(LoginUser.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        }).addCase(LoginUser.rejected, (state, action) => {
            console.log(action);
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: action.payload?.message || action.payload
            }
        }).addCase(SignupWithGoogle.pending, (state) => {
            state.isLoading = true
        }).addCase(SignupWithGoogle.fulfilled, (state, action) => {

            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        }).addCase(SignupWithGoogle.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: action.payload?.message || action.payload
            }
        }).addCase(LoginWithGoogle.pending, (state) => {
            state.isLoading = true
        }).addCase(LoginWithGoogle.fulfilled, (state, action) => {

            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        }).addCase(LoginWithGoogle.rejected, (state, action) => {
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                errorMessage: action.payload?.message || action.payload
            }
        })
            .addCase(followUser.pending, (state) => {
                state.isLoading = true
            }).addCase(followUser.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), following_user: action.payload?.data?.following_user }))
                state.user.following_user = action.payload?.data?.following_user
            }).addCase(followUser.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errorMessage: action.payload?.message || action.payload
                }
            })
            .addCase(addToBookmarkQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(addToBookmarkQuestion.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), bookmark: JSON.parse(localStorage.getItem('user')).bookmark ? (JSON.parse(localStorage.getItem('user')).bookmark.includes(action.meta.arg.id)) ? [...JSON.parse(localStorage.getItem('user')).bookmark] : [...JSON.parse(localStorage.getItem('user')).bookmark, action.meta.arg.id] : [action.meta.arg.id] }))
                if (state.user.bookmark) {
                    state.user.bookmark?.push(action.meta.arg.id)
                } else {
                    state.user.bookmark = [action.meta.arg.id]
                }
            }).addCase(addToBookmarkQuestion.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                    errorMessage: action.payload?.message || action.payload
                }
            })
            .addCase(removeFromBookmarkQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(removeFromBookmarkQuestion.fulfilled, (state, action) => {
                const newBookmark = JSON.parse(localStorage.getItem('user')).bookmark?.filter((data) => data != action.meta.arg.id)
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), bookmark: JSON.parse(localStorage.getItem('user')).bookmark ? newBookmark : null }))
                if (state.user.bookmark) {
                    state.user.bookmark = newBookmark
                }
            }).addCase(removeFromBookmarkQuestion.rejected, (state, action) => {
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

export const { addUser, changeStatus, clearUserData, TurnOnDarkMode, updateState,updateBookMark } = userSlice.actions
export default userSlice.reducer