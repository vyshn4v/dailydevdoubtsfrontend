import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLoginPage/AdminLogin'
import ProtectedRouter from '../util/ProtectedRouter/Admin/ProtectedRouter'
import AdminDashBoard from '../pages/Admin/AdminDashBoardPage/AdminDashBoard'
import DrawerOutlet from '../pages/Admin/AdminDrawerPage/AdminDrawerOutlet'
import Questions from '../pages/Admin/QuestionsPage/Questions'
import Users from '../pages/Admin/AllUsersPage/Users'
import ViewQuestionPage from '../pages/Admin/ViewQuestion/ViewQuestion'
import ViewReportedQuestion from '../pages/Admin/ViewReportedQuestionPage/ViewReportedQuestion'
import Plans from '../pages/Admin/Plans/Plans'
import AdverTiseMentPage from '../pages/Admin/AdvertisementPage/AdverTiseMentPage'
import NotFound from '../pages/NotFound/NotFound'
import { ErrorBoundary } from 'react-error-boundary'
import FallBack from '../components/FallBack/FallBack'
function Admin() {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRouter><DrawerOutlet /></ProtectedRouter>}>
                <Route path='dashboard' element={<ErrorBoundary key={'user'} onReset={() => 'user'} fallback={<FallBack errorMessage={"Something went wrong while loading dashboard"} />}><AdminDashBoard /></ErrorBoundary>} />
                <Route path='questions' element={<Questions />} />
                <Route path='reports' element={<ViewReportedQuestion />} />
                <Route path='advertises' element={<AdverTiseMentPage />} />
                <Route path='users' element={<Users />} />
                <Route path='plans' element={<Plans />} />
                <Route path='question/:question_id' element={<ViewQuestionPage />} />
            </Route>
            <Route path='/login' element={<ProtectedRouter><AdminLogin /></ProtectedRouter>} />
            {/* <Route path='/admin' element={<ProtectedRouter><DrawerOutlet /></ProtectedRouter>} > */}
            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}

export default Admin