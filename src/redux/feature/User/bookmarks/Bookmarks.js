import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import services from "../../../../services/question"
export const bookmarkedQuestions = createAsyncThunk('bookmark/get', async (data, { rejectWithValue }) => {
    try {
        const response = await services.getBookmarkedQuestions(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})


const initialState = {
    bookmarks: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDarkMode: false,
    errorMessage: ""
}
export const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        reset() {
            return initialState
        },
        removeBookmark(state, action) {
            const updatedBookmark = state.bookmarks?.Bookmarks?.filter((bookmark) => bookmark._id != action.payload)
            state.bookmarks.Bookmarks = updatedBookmark
        }
    },
    extraReducers(builder) {
        builder
            .addCase(bookmarkedQuestions.pending, (state) => {
                state.isLoading = true
            }).addCase(bookmarkedQuestions.fulfilled, (state, action) => {
                return {
                    ...state,
                    bookmarks: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,

                }
            }).addCase(bookmarkedQuestions.rejected, (state, action) => {
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

export const { reset,removeBookmark } = bookmarkSlice.actions
export default bookmarkSlice.reducer