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
import ChatComponent from '../components/Chat/ChatCompnent'
import ChatDummy from '../components/Chat/ChatDummy'
import Bookmark from '../pages/User/BookmarkPage/Bookmark'
import SuggestEditAnswer from '../pages/User/SuggestAnEdit/SuggestAnEdit'
import Badge from '../pages/User/Profile/Badge'
import Plans from '../pages/User/SubsriptionPlans/Plans'
import ForgotPassword from '../pages/User/ForgotPassword/ForgotPassword'
import NotFound from '../pages/NotFound/NotFound'
import { ErrorBoundary } from "react-error-boundary";
import FallBack from '../components/FallBack/FallBack'
function User() {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRouter ><DrawerOutlet /></ProtectedRouter>} >
                <Route index element={<ErrorBoundary key={'questions'} onReset={()=>"questions"} fallback={<FallBack errorMessage={"something went wrong while loading questions"} />}><Home /></ErrorBoundary>} />
                <Route path='ask-question' element={<AskQuestion />} />
                <Route path='users' element={<ErrorBoundary key={'users'} onReset={()=>'users'} fallback={<FallBack errorMessage={"something went wrong while loading users"} />}><Users /></ErrorBoundary>} />
                <Route path='chat' element={<ErrorBoundary key={'chat'} onReset={()=>'chat'} fallback={<FallBack errorMessage={"something went wrong while loading chat"} />}><Chat /></ErrorBoundary>} >
                    <Route index element={<ChatDummy />} />
                    <Route path=':chat_id' element={<ChatComponent />} />
                </Route>
                <Route path='plans' element={<Plans />} />
                <Route path='bookmarks' element={<ErrorBoundary key={'bookmarks'} onReset={()=>'bookmarks'} fallback={<FallBack errorMessage={"something went wrong while loading bookmarks"} />}><Bookmark /></ErrorBoundary>} />
                <Route path='question/:question_id' element={<ErrorBoundary key={'question'} onReset={()=>"question"} fallback={<FallBack errorMessage={"something went wrong while loading question"} />}><ViewQuestionPage /></ErrorBoundary>} />
                <Route path='question/:question_id/report' element={<ReportQuestion />} />
                <Route path='question/:question_id/edit-answer/:answer_id' element={<EditAnswer />} />
                <Route path='question/:question_id/suggest-an-edit/:answer_id' element={<SuggestEditAnswer />} />
                <Route path='profile/' element={<ErrorBoundary key={'profile'} onReset={()=>'profile'} fallback={<FallBack errorMessage={"something went wrong"} />}><Profile /></ErrorBoundary>} >
                    <Route path='details' index element={<Details />} />
                    <Route path='edit-requests' element={<Editrequests />} />
                    <Route path='question' element={<Questions />} />
                    <Route path='answers' element={<Answers />} />
                    <Route path='badges' element={<Badge />} />
                </Route>
                <Route path=':user/' element={<ErrorBoundary key={'user'} onReset={()=>'user'} fallback={<FallBack errorMessage={"Something went wrong"} />}><Profile /></ErrorBoundary>} >
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
            <Route path='/forgot-password' element={<ProtectedRouter><ForgotPassword /></ProtectedRouter>} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}

export default User