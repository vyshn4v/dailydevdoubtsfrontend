import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import service from "../../../../services/question"
import answeServices from "../../../../services/answer"

export const getQuestion = createAsyncThunk('user/singleQuestions/getAll', async (data, { rejectWithValue }) => {
    try {
        const response = await service.getQuestion(data)
        return response.data
    } catch (err) {
        console.log(err);
        if (!err.message) {
            throw err
        }
        return rejectWithValue(err.message)
    }
})
export const upvoteQuestion = createAsyncThunk('user/singleQuestions/Upvote', async (data, { rejectWithValue }) => {
    try {
        const response = await service.upVoteQuestion(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const downVoteQuestion = createAsyncThunk('user/singleQuestions/downVote', async (data, { rejectWithValue }) => {
    try {
        const response = await service.downVoteQuestion(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const upvoteAnswer = createAsyncThunk('user/singleQuestions/upvoteAnswer', async (data, { rejectWithValue }) => {
    try {
        const response = await answeServices.voteAnswer(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const downVoteAnswer = createAsyncThunk('user/singleQuestions/downVoteAnswer', async (data, { rejectWithValue }) => {
    try {
        const response = await answeServices.voteAnswer(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
export const rejectQuestion = createAsyncThunk('user/singleQuestions/report', async (data, { rejectWithValue }) => {
    try {
        const response = await service.getQuestion(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})



const initialState = {
    question: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
}

export const SigleQuestionList = createSlice({
    name: 'UserQuestions',
    initialState,
    reducers: {
        resetQuestions(state) {
            return { ...state, ...initialState }
        },
        addAnswerToState(state, action) {
            state.question[0]?.answers?.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(getQuestion.fulfilled, (state, action) => {
                console.log(action.payload);
                return {
                    ...state,
                    question: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }).addCase(getQuestion.rejected, (state, action) => {
                return {
                    question: action.payload.data,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(upvoteQuestion.pending, () => {
                // state.isLoading = true
            }).addCase(upvoteQuestion.fulfilled, (state, action) => {
                state.question[0].question.hello = 'hello'
                state.question[0].question.up_vote = [...action.payload.data.up_vote]
                state.question[0].question.down_vote = [...action.payload.data.down_vote]
                state.isLoading = false
                state.isError = false
                state.isSuccess = true

            }).addCase(upvoteQuestion.rejected, (state) => {

                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(downVoteQuestion.pending, (state) => {
                state.isLoading = true
            }).addCase(downVoteQuestion.fulfilled, (state, action) => {
                state.question[0].question.hello = 'hello'
                state.question[0].question.up_vote = [...action.payload.data.up_vote]
                state.question[0].question.down_vote = [...action.payload.data.down_vote]
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
            }).addCase(downVoteQuestion.rejected, (state) => {
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false,
                }
            })
            .addCase(upvoteAnswer.pending, () => {
                // state.isLoading = true
            }).addCase(upvoteAnswer.fulfilled, (state, action) => {
                console.log(action.meta.arg.answer_id)
                const answer_id = action.meta.arg.answer_id
                const answers = state.question[0].answers.map((answer) => {
                    if (answer._id === answer_id) {
                        return action.payload.data
                    } else {
                        return answer
                    }
                })
                state.question[0].answers = answers
                state.isLoading = false
                state.isError = false
                state.isSuccess = true

            }).addCase(upvoteAnswer.rejected, (state) => {

                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })
            .addCase(downVoteAnswer.pending, () => {
                // state.isLoading = true
            }).addCase(downVoteAnswer.fulfilled, (state, action) => {
                const answer_id = action.meta.arg.answer_id
                const answers = state.question[0].answers.map((answer) => {
                    if (answer._id === answer_id) {
                        return action.payload.data
                    } else {
                        return answer
                    }
                })
                state.question[0].answers = answers
                // state.isLoading = false
                // state.isError = false
                // state.isSuccess = true

            }).addCase(downVoteAnswer.rejected, (state) => {

                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    isSuccess: false
                }
            })

    }
})

export const { resetQuestions, addAnswerToState } = SigleQuestionList.actions
export default SigleQuestionList.reducer