import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../feature/User/userAuth/Auth'
import adminSlice from '../feature/Admin/adminAuth/Auth'
import questionSlice from '../feature/Admin/questionManagement/QuestionManagment'
import usersSlice from '../feature/Admin/userManagment/UserManagment'
import userQuestionsSlice from '../feature/User/questions/Question'
import SigleQuestionList from '../feature/User/singleQuestion/Singlequestion'
import profileSlice from '../feature/User/profile/Profile'
import reportedQuestionsSlice from '../feature/Admin/reportedQuestions/ReportedQuestions'
import chatSlice from '../feature/User/chat/Chat'
import bookmarkSlice from '../feature/User/bookmarks/Bookmarks'

export default configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    admin: adminSlice,
    questions: questionSlice,
    users: usersSlice,
    questionList: userQuestionsSlice,
    question: SigleQuestionList,
    reportedQuestions: reportedQuestionsSlice,
    chats: chatSlice,
    bookmarks: bookmarkSlice
  }
})