import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { adminLogin } from "../../../../services/userAuth"
import questionService from "../../../../services/question"

export const getReportedQuestions = createAsyncThunk('admin/getReportedQuestions', async (user, { rejectWithValue }) => {
    try {
        const response = await questionService.getReportQuestions(user)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const approveQuestion = createAsyncThunk('admin/getReportedQuestions/approve', async (data, { rejectWithValue }) => {
    try {
        const response = await questionService.approveQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const rejectQuestion = createAsyncThunk('admin/getReportedQuestions/reject', async (data, { rejectWithValue }) => {
    try {
        const response = await questionService.rejectQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const paginaTion = createAsyncThunk('admin/getReportedQuestions/paginate', async (data, { rejectWithValue }) => {
    try {
        const response = await questionService.getReportQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const initialState = {
    reportedQuestions: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDarkMode: false
}
export const reportedQuestionsSlice = createSlice({
    name: 'reportedQuestions',
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
        builder
            .addCase(getReportedQuestions.pending, (state) => {
                state.isLoading = true
            }).addCase(getReportedQuestions.fulfilled, (state, action) => {
                return {
                    ...state,
                    reportedQuestions: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(getReportedQuestions.rejected, (state, action) => {
                return {
                    ...state,
                    reportedQuestions: action.payload.data,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(approveQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(approveQuestion.fulfilled, (state, action) => {
                const reportedQuestions = state.reportedQuestions ? state?.reportedQuestions?.map((question) => {
                    if (question.question._id === action.meta.arg.id) {
                        return {
                            ...question,
                            question: {
                                ...question.question,
                                "isApprove": true
                            }
                        }

                    }
                    return question
                }) : []
                return {
                    ...state,
                    reportedQuestions: reportedQuestions
                }
            }).addCase(approveQuestion.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(rejectQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(rejectQuestion.fulfilled, (state, action) => {
                const reportedQuestions = state.reportedQuestions ? state?.reportedQuestions?.map((question) => {
                    if (question.question._id === action.meta.arg.id) {
                        return {
                            ...question,
                            question: {
                                ...question.question,
                                "isApprove": false
                            }
                        }

                    }
                    return question
                }) : []
                return {
                    ...state,
                    reportedQuestions: reportedQuestions
                }
            }).addCase(rejectQuestion.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
    }
})


export const { addAdmin, changeStatus, clearAdminData, TurnOnDarkMode } = reportedQuestionsSlice.actions
export default reportedQuestionsSlice.reducer
