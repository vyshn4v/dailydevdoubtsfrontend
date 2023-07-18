import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLoginPage/AdminLogin'
import ProtectedRouter from '../util/ProtectedRouter/Admin/ProtectedRouter'
import AdminDashBoard from '../pages/Admin/AdminDashBoardPage/AdminDashBoard'
import DrawerOutlet from '../pages/Admin/AdminDrawerPage/AdminDrawerOutlet'
import Questions from '../pages/Admin/QuestionsPage/Questions'
import Users from '../pages/Admin/AllUsersPage/Users'
import ViewQuestionPage from '../pages/Admin/ViewQuestion/ViewQuestion'
import ViewReportedQuestion from '../pages/Admin/ViewReportedQuestionPage/ViewReportedQuestion'

function Admin() {
    return (
        <Routes>
            <Route path='/admin' element={<ProtectedRouter><DrawerOutlet /></ProtectedRouter>}>
                <Route path='dashboard' element={<AdminDashBoard />} />
                <Route path='questions' element={<Questions />} />
                <Route path='reports' element={<ViewReportedQuestion />} />
                <Route path='users' element={<Users />} />
                <Route path='question/:question_id' element={<ViewQuestionPage />} />
            </Route>
            <Route path='/admin/login' element={<ProtectedRouter><AdminLogin /></ProtectedRouter>} />
            {/* <Route path='/admin' element={<ProtectedRouter><DrawerOutlet /></ProtectedRouter>} > */}

        </Routes>
    )
}

export default Admin