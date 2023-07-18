import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import services from "../../../../services/chat"
export const getAllChat = createAsyncThunk('chat/getChat', async (data, { rejectWithValue }) => {
    try {
        const response = await services.getAllChats(data)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})





const initialState = {
    chats: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isDarkMode: false,
    errorMessage: ""
}
export const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat(state, { payload }) {
            state.chats = [payload, ...state.chats]
        },
        updateChat(state, { payload }) {
            const updatedChat = state.chats.map((chat) => {
                if (chat._id == payload._id) {
                    return {
                        ...chat,
                        users: payload.users
                    }
                } else {
                    return chat
                }
            })
            console.log('updated chat',updatedChat);
            state.chats = updatedChat
        },
        addMessages(state, action) {
            const newchats = state.chats.map((chat) => {
                if (chat._id == action.payload.room_id) {
                    return {
                        ...chat,
                        messages: [...chat.messages, action.payload.data]
                    }
                } else {
                    return chat
                }
            })
            state.chats = newchats
        },
        deleteChat(state, action) {
            console.log(action);
            const newchats = state.chats.filter((chat) => chat._id != action.payload.room_id)
            console.log(newchats);
            state.chats = newchats
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllChat.pending, (state) => {
                state.isLoading = true
            }).addCase(getAllChat.fulfilled, (state, action) => {
                return {
                    ...state,
                    chats: action.payload.data,
                    isLoading: false,
                    isError: false,
                    isSuccess: true,
                }
            }).addCase(getAllChat.rejected, (state, action) => {
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

export const { addUser, addMessages,updateChat, addChat, createChat, deleteChat } = chatSlice.actions
export default chatSlice.reducer