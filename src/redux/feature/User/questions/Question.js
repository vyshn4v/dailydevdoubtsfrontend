import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllQuestions, approveQuestions, rejectQuestions } from "../../../../services/question"

export const getAllQuestion = createAsyncThunk('user/questions/getAll', async (data, { rejectWithValue }) => {
    try {
        const response = await getAllQuestions(data)
        return response.data
    } catch (err) {
        console.log(err);
        if (!err.message) {
            throw err
        }
        return rejectWithValue(err.message)
    }
})
export const paginaTion = createAsyncThunk('user/questions/paginate', async (data, { rejectWithValue }) => {
    try {
        const response = await getAllQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const approveQuestion = createAsyncThunk('user/questions/approve', async (data, { rejectWithValue }) => {
    try {
        const response = await approveQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const rejectQuestion = createAsyncThunk('user/questions/reject', async (data, { rejectWithValue }) => {
    try {
        const response = await rejectQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})


const initialState = {
    questions: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    page: 0
}

export const questionList = createSlice({
    name: 'UserQuestions',
    initialState,
    reducers: {
        resetQuestions(state, action) {
            return { ...state, ...initialState }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(getAllQuestion.fulfilled, (state, action) => {
                return {
                    ...state,
                    questions: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(getAllQuestion.rejected, (state, action) => {
                return {
                    ...state,
                    questions: action.payload.data,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(approveQuestion.pending, () => {
                // state.isLoading = true
            }).addCase(approveQuestion.fulfilled, (state, action) => {
                const question = action.payload.data
                const questions = state.questions.map((data) => {
                    if (data._id === action.meta.arg.id) {
                        return question
                    } else {
                        return data
                    }
                })
                return {
                    ...state,
                    questions: questions,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(approveQuestion.rejected, (state) => {

                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(rejectQuestion.pending, () => {
                // state.isLoading = true
            }).addCase(rejectQuestion.fulfilled, (state, action) => {
                const question = action.payload.data
                const questions = state.questions.map((data) => {
                    if (data._id === action.meta.arg.id) {
                        return question
                    } else {
                        return data
                    }
                })
                return {
                    ...state,
                    questions: questions,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(rejectQuestion.rejected, (state) => {
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
                    questions: action.payload.data,
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

export const { resetQuestions } = questionList.actions
export default questionList.reducer