import { Route, Routes } from 'react-router-dom'
import ProtectedRouter from '../util/ProtectedRouter/User/ProtectedRouter'
import DrawerOutlet from '../pages/User/UserDrawerPage/DrawerOutlet'
import AskQuestion from '../pages/User/AskQuestionPage/AskQuestion'
import Home from '../pages/User/HomePage/Home'
import Otp from '../pages/User/OtpPage/Otp'
import Login from '../pages/User/LoginPage/Login'
import Signup from '../pages/User/SignupPage/Signup'
import ViewQuestionPage from '../pages/User/ViewQuestionPage/ViewQuestion'
import Profile from '../pages/User/Profile/Profile'
import Details from '../pages/User/Profile/Details'
import Editrequests from '../pages/User/Profile/EditRequests'
import Questions from '../pages/User/Profile/Questions'
import Answers from '../pages/User/Profile/Answers'
import Users from '../pages/User/UsersPage/Users'
import ReportQuestion from '../pages/User/ReportQuestionPage/ReportQuestion'
import EditAnswer from '../pages/User/EditAnswer/EditAnswer'
import Chat from '../pages/User/ChatPage/Chat'
import ChatCompnent from '../components/Chat/ChatCompnent'
import ChatDummy from '../components/Chat/ChatDummy'
import Bookmark from '../pages/User/BookmarkPage/Bookmark'
import SuggestEditAnswer from '../pages/User/SuggestAnEdit/SuggestAnEdit'
import Badge from '../pages/User/Profile/badge'
function User() {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRouter ><DrawerOutlet /></ProtectedRouter>} >
                <Route index element={<Home />} />
                <Route path='ask-question' element={<AskQuestion />} />
                <Route path='users' element={<Users />} />
                <Route path='chat' element={<Chat />} >
                    <Route index element={<ChatDummy />} />
                    <Route path=':chat_id' element={<ChatCompnent />} />
                </Route>
                <Route path='bookmarks' element={<Bookmark />} />
                <Route path='question/:question_id' element={<ViewQuestionPage />} />
                <Route path='question/:question_id/report' element={<ReportQuestion />} />
                <Route path='question/:question_id/edit-answer/:answer_id' element={<EditAnswer />} />
                <Route path='question/:question_id/suggest-an-edit/:answer_id' element={<SuggestEditAnswer />} />
                <Route path='profile/' element={<Profile />} >
                    <Route path='details' index element={<Details />} />
                    <Route path='edit-requests' element={<Editrequests />} />
                    <Route path='question' element={<Questions />} />
                    <Route path='answers' element={<Answers />} />
                    <Route path='badges' element={<Badge />} />
                </Route>
                <Route path=':user/' element={<Profile />} >
                    <Route path='details' index element={<Details />} />
                    <Route path='edit-requests' element={<Editrequests />} />
                    <Route path='question' element={<Questions />} />
                    <Route path='answers' element={<Answers />} />
                    <Route path='badges' element={<Badge />} />
                </Route>
            </Route>
            <Route path='/verify-otp' element={<ProtectedRouter><Otp /></ProtectedRouter>} />
            <Route path='/login' element={<ProtectedRouter><Login /></ProtectedRouter>} />
            <Route path='/signup' element={<ProtectedRouter><Signup /></ProtectedRouter>} />
        </Routes>
    )
}

export default User